from apps.user.views import achievement, user
from django.urls import path

app_name = "user"

urlpatterns = [
    path("", user.UserObjectView.as_view(), name="user"),
    path("create/", user.UserCreateView.as_view(), name="user_create"),
    path("update/", user.UserUpdateView.as_view(), name="user_update"),
    path(
        "achievements/", achievement.AchievementListView.as_view(), name="achievements"
    ),
    path(
        "achievements/<int:pk>/",
        achievement.AchievementDetailView.as_view(),
        name="achievement_detail",
    ),
    path(
        "achievements/<int:pk>/update/",
        achievement.AchievementUpdateView.as_view(),
        name="achievement_update",
    ),
    path(
        "achievements/<int:pk>/delete/",
        achievement.AchievementDeleteView.as_view(),
        name="achievement_delete",
    ),
    # Achievements do usuário (logs) - supondo que você tenha uma view para listar logs do usuário
    path(
        "achievements/user/",
        achievement.AchievementLogListView.as_view(),
        name="achievements_user",
    ),
    # Log de achievement detalhe (se precisar)
    path(
        "achievements/user/<int:pk>/",
        achievement.AchievementLogDetailView.as_view(),
        name="achievement_log_detail",
    ),
]
