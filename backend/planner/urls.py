<<<<<<< HEAD
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
router.register("dashboard", DashboardViewSet, basename="dashboard")

urlpatterns = [
    path("auth/register/", RegisterView.as_view()),
    path("", include(router.urls)),
=======
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
router.register("dashboard", DashboardViewSet, basename="dashboard")

urlpatterns = [
    path("auth/register/", RegisterView.as_view()),
    path("", include(router.urls)),
>>>>>>> 6db5b69cab8c264b937baaa36976fd5ad75a9c2b
]