from apps.progress.views import achievement, objetives
from django.urls import path

app_name = "progress"

urlpatterns = [
    path("objective/", objetives.ObjectiveListView.as_view(), name="objective"),
    path(
        "objective/create/",
        objetives.ObjectiveCreateView.as_view(),
        name="objective_create",
    ),
    path(
        "objective/detail/<int:id>/",
        objetives.ObjectiveDetailView.as_view(),
        name="objective_detail",
    ),
    path(
        "objective/detail/<int:id>/update/",
        objetives.ObjectiveUpdateView.as_view(),
        name="objective_update",
    ),
    path(
        "objective/detail/<int:id>/delete/",
        objetives.ObjectiveDeleteView.as_view(),
        name="objective_delete",
    ),
    path("achievements/", achievement.AchievementsView.as_view(), name="achievements"),
    path(
        "achievements/user/",
        achievement.AchievementsUserView.as_view(),
        name="achievements_user",
    ),
]
