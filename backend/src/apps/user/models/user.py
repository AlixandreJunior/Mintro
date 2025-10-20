from __future__ import annotations

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.manager import RelatedManager

from apps.diary.models.diary import Diary
from apps.health.models.exercise import ExerciseLog
from apps.health.models.mindfulness import MindfulnessLog
from utils.manager import UsersManager


class User(AbstractUser):
    class Meta:
        app_label = "user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    diary_set: RelatedManager[Diary]
    mindfulnesslog_set: RelatedManager[MindfulnessLog]
    exerciselog_set: RelatedManager[ExerciseLog]

    objects = UsersManager()
    groups = None
    user_permissions = None

    def __str__(self) -> str:
        return self.username
