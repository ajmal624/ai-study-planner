from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AvailabilityViewSet,
    CourseViewSet,
    DashboardViewSet,
    ExamViewSet,
    RegisterView,
    StudyTaskViewSet,
)


router = DefaultRouter()

router.register("courses", CourseViewSet, basename="course")
router.register("exams", ExamViewSet, basename="exam")
router.register("availability", AvailabilityViewSet, basename="availability")
router.register("tasks", StudyTaskViewSet, basename="task")


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("", include(router.urls)),
    path(
        "dashboard/",
        DashboardViewSet.as_view({"get": "list"}),
        name="dashboard",
    ),
]