from django.urls import path

from apps.user.views import achievement, reminder, user

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
        "achievements/user/",
        achievement.AchievementLogListView.as_view(),
        name="achievements_user",
    ),
    path(
        "achievements/user/<int:pk>/",
        achievement.AchievementLogDetailView.as_view(),
        name="achievement_log_detail",
    ),
    path("reminders/", reminder.ReminderListView.as_view(), name="reminder_list"),
    path(
        "reminders/create/",
        reminder.ReminderCreateView.as_view(),
        name="reminder_create",
    ),
    path(
        "reminders/<int:pk>/",
        reminder.ReminderDetailView.as_view(),
        name="reminder_detail",
    ),
    path(
        "reminders/<int:pk>/update/",
        reminder.ReminderUpdateView.as_view(),
        name="reminder_update",
    ),
    path(
        "reminders/<int:pk>/delete/",
        reminder.ReminderDeleteView.as_view(),
        name="reminder_delete",
    ),
]
