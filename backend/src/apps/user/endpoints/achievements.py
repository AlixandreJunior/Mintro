from django.urls import path

from apps.user.views.achievement import (
    AchievementDetailView,
    AchievementListView,
    AchievementLogDetailView,
    AchievementLogListView,
)

app_name = "achievement"

#: Define as rotas relacionadas a conquistas (Achievements)
urlpatterns = [
    path("", AchievementListView.as_view(), name="achievements"),
    path("detail/<int:pk>/", AchievementDetailView.as_view(), name="detail"),
    path("user/", AchievementLogListView.as_view(), name="user"),
    path("user/<int:pk>/", AchievementLogDetailView.as_view(), name="log_detail"),
]
