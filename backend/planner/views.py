from datetime import date, timedelta
from decimal import Decimal

from django.contrib.auth.models import User
from django.db.models import Count, Sum
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Availability, Course, Exam, StudyTask
from .serializers import (
    AvailabilitySerializer,
    CourseSerializer,
    ExamSerializer,
    RegisterSerializer,
    StudyTaskSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class OwnedViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CourseViewSet(OwnedViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class ExamViewSet(OwnedViewSet):
    queryset = Exam.objects.select_related("course").all()
    serializer_class = ExamSerializer


class AvailabilityViewSet(OwnedViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer


class StudyTaskViewSet(OwnedViewSet):
    queryset = StudyTask.objects.select_related("course").all()
    serializer_class = StudyTaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        start = self.request.query_params.get("start")
        end = self.request.query_params.get("end")

        if start:
            queryset = queryset.filter(date__gte=start)

        if end:
            queryset = queryset.filter(date__lte=end)

        return queryset

    @action(detail=False, methods=["post"], url_path="generate-plan")
    def generate_plan(self, request):
        """
        Adaptive revision-plan generator:
        - Gives more sessions to higher-priority and closer exams.
        - Uses the user's available study hours per weekday.
        - Avoids creating more than the available daily duration.
        """
        days_to_plan = int(request.data.get("days", 14))
        start_date = date.today()
        end_date = start_date + timedelta(days=days_to_plan - 1)

        StudyTask.objects.filter(
            user=request.user,
            date__gte=start_date,
            date__lte=end_date,
            generated_by_ai=True,
            status="pending",
        ).delete()

        availability = {
            item.day_of_week: float(item.available_hours)
            for item in Availability.objects.filter(user=request.user)
        }

        exams = Exam.objects.filter(
            user=request.user,
            exam_date__gte=start_date,
        ).select_related("course")

        if not exams.exists():
            return Response(
                {"detail": "Add at least one future exam before generating a plan."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        created_tasks = []

        for offset in range(days_to_plan):
            plan_date = start_date + timedelta(days=offset)
            available_minutes = int(availability.get(plan_date.weekday(), 0) * 60)

            if available_minutes <= 0:
                continue

            daily_exams = []

            for exam in exams:
                days_left = max((exam.exam_date - plan_date).days, 1)
                course_progress_gap = 100 - exam.course.progress

                # Higher priority, less time, and less progress = higher score.
                score = (
                    exam.priority * 100
                    + course_progress_gap * 2
                    + max(0, 60 - days_left)
                )

                daily_exams.append((score, exam))

            daily_exams.sort(key=lambda item: item[0], reverse=True)

            for _, exam in daily_exams:
                if available_minutes < 30:
                    break

                duration = min(60, available_minutes)

                if exam.exam_date == plan_date:
                    title = f"Final revision: {exam.title}"
                elif exam.course.progress < 50:
                    title = f"Learn core topics: {exam.course.name}"
                else:
                    title = f"Revision practice: {exam.course.name}"

                task = StudyTask.objects.create(
                    user=request.user,
                    course=exam.course,
                    title=title,
                    date=plan_date,
                    duration_minutes=duration,
                    priority=exam.priority,
                    generated_by_ai=True,
                    notes=f"Preparing for {exam.title} on {exam.exam_date}.",
                )

                created_tasks.append(task)
                available_minutes -= duration

        return Response(
            StudyTaskSerializer(
                created_tasks,
                many=True,
                context={"request": request},
            ).data,
            status=status.HTTP_201_CREATED,
        )


class DashboardViewSet(viewsets.ViewSet):
    def list(self, request):
        today = date.today()

        courses = Course.objects.filter(user=request.user)
        exams = Exam.objects.filter(
            user=request.user,
            exam_date__gte=today,
        ).select_related("course")[:5]

        tasks_today = StudyTask.objects.filter(
            user=request.user,
            date=today,
        ).select_related("course")

        completed_tasks = StudyTask.objects.filter(
            user=request.user,
            status="completed",
        ).count()

        total_tasks = StudyTask.objects.filter(user=request.user).count()

        total_minutes = StudyTask.objects.filter(
            user=request.user,
            status="completed",
        ).aggregate(total=Sum("duration_minutes"))["total"] or 0

        return Response(
            {
                "course_count": courses.count(),
                "completed_tasks": completed_tasks,
                "total_tasks": total_tasks,
                "completed_minutes": total_minutes,
                "upcoming_exams": ExamSerializer(
                    exams,
                    many=True,
                    context={"request": request},
                ).data,
                "today_tasks": StudyTaskSerializer(
                    tasks_today,
                    many=True,
                    context={"request": request},
                ).data,
            }
        )