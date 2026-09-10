from django.contrib.auth.models import User
from django.db import models


class Course(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="courses",
    )
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=30, blank=True)
    color = models.CharField(max_length=7, default="#6366f1")
    total_topics = models.PositiveIntegerField(default=10)
    completed_topics = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    @property
    def progress(self):
        if self.total_topics == 0:
            return 0
        return round((self.completed_topics / self.total_topics) * 100)

    def __str__(self):
        return self.name


class Exam(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="exams",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="exams",
    )
    title = models.CharField(max_length=150)
    exam_date = models.DateField()
    priority = models.PositiveSmallIntegerField(default=3)
    target_score = models.PositiveIntegerField(default=80)

    class Meta:
        ordering = ["exam_date"]

    def __str__(self):
        return self.title


class Availability(models.Model):
    DAY_CHOICES = [
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="availability",
    )
    day_of_week = models.PositiveSmallIntegerField(choices=DAY_CHOICES)
    available_hours = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        default=2,
    )

    class Meta:
        unique_together = ("user", "day_of_week")
        ordering = ["day_of_week"]

    def __str__(self):
        return f"{self.get_day_of_week_display()} - {self.available_hours}h"


class StudyTask(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="study_tasks",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="study_tasks",
    )
    title = models.CharField(max_length=255)
    date = models.DateField()
    duration_minutes = models.PositiveIntegerField(default=60)
    priority = models.PositiveSmallIntegerField(default=3)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="pending",
    )
    generated_by_ai = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date", "status", "-priority"]

    def __str__(self):
        return self.title