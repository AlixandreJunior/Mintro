from django.urls import path

from apps.user.views.achievement import (
    AchievementDetailView,
    AchievementListView,
    AchievementLogDetailView,
    AchievementLogListView,
)

app_name = "achievements"

#: Define as rotas relacionadas a conquistas (Achievements)
urlpatterns = [
    path("", AchievementListView.as_view(), name="list"),
    path("detail/<int:id>/", AchievementDetailView.as_view(), name="detail"),
    path("user/", AchievementLogListView.as_view(), name="user_list"),
    path("user/<int:id>/", AchievementLogDetailView.as_view(), name="user_detail"),
]
