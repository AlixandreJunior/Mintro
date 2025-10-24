from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

if TYPE_CHECKING:
    from django.db.models.manager import Manager

    from apps.diary.models.diary import Diary
    from apps.health.models.exercise import ExerciseLog
    from apps.health.models.mindfulness import MindfulnessLog


class User(AbstractUser):
    class Meta:
        app_label = "user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    diary_set: "Manager[Diary]"
    mindfulnesslog_set: "Manager[MindfulnessLog]"
    exerciselog_set: "Manager[ExerciseLog]"

    objects = UserManager["User"]()
    groups = None
    user_permissions = None

    def __str__(self) -> str:
        return self.username
