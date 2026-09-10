from django.contrib import admin

from .models import Availability, Course, Exam, StudyTask

admin.site.register(Course)
admin.site.register(Exam)
admin.site.register(Availability)
admin.site.register(StudyTask)