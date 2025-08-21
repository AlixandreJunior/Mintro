from apps.health.views import exercise, hydratation, mindfulness
from django.urls import path

app_name = "health"

urlpatterns = [
    path(
        "hydratation/",
        hydratation.HydratationLogListView.as_view(),
        name="hydratation_list",
    ),  #
    path(
        "hydratation/register/",
        hydratation.HydratationLogRegisterView.as_view(),
        name="hydratation_register",
    ),  #
    path("exercise/", exercise.ExerciseListView.as_view(), name="exercise_list"),  #
    path(
        "exercise/log/", exercise.ExerciseLogView.as_view(), name="exercise_log_list"
    ),  #
    path(
        "exercise/log/register/",
        exercise.ExerciseLogRegisterView.as_view(),
        name="exercise_log_register",
    ),  #
    path(
        "mindfulness/",
        mindfulness.MindfulnessListView.as_view(),
        name="mindfulness_list",
    ),
    path(
        "mindfulness/log/",
        mindfulness.MindfulnessLogListView.as_view(),
        name="mindfulness_log_list",
    ),
    path(
        "mindfulness/log/register/",
        mindfulness.MindfulnessLogRegisterView.as_view(),
        name="mindfulness_log_register",
    ),
]
