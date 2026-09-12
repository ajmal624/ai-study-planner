<<<<<<< HEAD
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Availability, Course, Exam, StudyTask


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

        for day in range(7):
            Availability.objects.create(
                user=user,
                day_of_week=day,
                available_hours=2,
            )

        return user


class CourseSerializer(serializers.ModelSerializer):
    progress = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "name",
            "code",
            "color",
            "total_topics",
            "completed_topics",
            "progress",
            "created_at",
        ]
        read_only_fields = ["id", "progress", "created_at"]


class ExamSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    course_color = serializers.CharField(source="course.color", read_only=True)

    class Meta:
        model = Exam
        fields = [
            "id",
            "course",
            "course_name",
            "course_color",
            "title",
            "exam_date",
            "priority",
            "target_score",
        ]
        read_only_fields = ["id"]

    def validate_course(self, course):
        if course.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid course.")
        return course


class AvailabilitySerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(
        source="get_day_of_week_display",
        read_only=True,
    )

    class Meta:
        model = Availability
        fields = ["id", "day_of_week", "day_name", "available_hours"]
        read_only_fields = ["id"]


class StudyTaskSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    course_color = serializers.CharField(source="course.color", read_only=True)

    class Meta:
        model = StudyTask
        fields = [
            "id",
            "course",
            "course_name",
            "course_color",
            "title",
            "date",
            "duration_minutes",
            "priority",
            "status",
            "generated_by_ai",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "generated_by_ai", "created_at"]

    def validate_course(self, course):
        if course.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid course.")
=======
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Availability, Course, Exam, StudyTask


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

        for day in range(7):
            Availability.objects.create(
                user=user,
                day_of_week=day,
                available_hours=2,
            )

        return user


class CourseSerializer(serializers.ModelSerializer):
    progress = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "name",
            "code",
            "color",
            "total_topics",
            "completed_topics",
            "progress",
            "created_at",
        ]
        read_only_fields = ["id", "progress", "created_at"]


class ExamSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    course_color = serializers.CharField(source="course.color", read_only=True)

    class Meta:
        model = Exam
        fields = [
            "id",
            "course",
            "course_name",
            "course_color",
            "title",
            "exam_date",
            "priority",
            "target_score",
        ]
        read_only_fields = ["id"]

    def validate_course(self, course):
        if course.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid course.")
        return course


class AvailabilitySerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(
        source="get_day_of_week_display",
        read_only=True,
    )

    class Meta:
        model = Availability
        fields = ["id", "day_of_week", "day_name", "available_hours"]
        read_only_fields = ["id"]


class StudyTaskSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)
    course_color = serializers.CharField(source="course.color", read_only=True)

    class Meta:
        model = StudyTask
        fields = [
            "id",
            "course",
            "course_name",
            "course_color",
            "title",
            "date",
            "duration_minutes",
            "priority",
            "status",
            "generated_by_ai",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "generated_by_ai", "created_at"]

    def validate_course(self, course):
        if course.user != self.context["request"].user:
            raise serializers.ValidationError("Invalid course.")
>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
        return course