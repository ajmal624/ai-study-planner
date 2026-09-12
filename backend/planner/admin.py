from django.contrib import admin

from .models import Availability, Course, Exam, StudyTask


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "code",
        "user",
        "total_topics",
        "completed_topics",
        "progress",
    )
    search_fields = ("name", "code", "user__username")
    list_filter = ("user",)


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "course",
        "user",
        "exam_date",
        "priority",
        "target_score",
    )
    search_fields = ("title", "course__name", "user__username")
    list_filter = ("exam_date", "priority")


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "day_of_week",
        "available_hours",
    )
    list_filter = ("day_of_week",)
    search_fields = ("user__username",)


@admin.register(StudyTask)
class StudyTaskAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "course",
        "user",
        "date",
        "duration_minutes",
        "priority",
        "status",
        "generated_by_ai",
    )
    search_fields = (
        "title",
        "course__name",
        "user__username",
    )
    list_filter = (
        "status",
        "priority",
        "generated_by_ai",
        "date",
    )