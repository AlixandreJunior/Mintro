from __future__ import annotations

from datetime import datetime

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.db.models.manager import RelatedManager

from apps.diary.models.diary import Diary
from apps.health.models.exercise import ExerciseLog
from apps.health.models.mindfulness import MindfulnessLog

class UsersManager(BaseUserManager[User]):
    def create_user(
        self, email: str, password: str | None = None, **extra_fields: object
    ) -> User: ...
    def create_superuser(
        self, email: str, password: str | None = None, **extra_fields: object
    ) -> User: ...

class User(AbstractUser):
    class Meta:
        app_label = "user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    created_at: models.DateTimeField[datetime]
    is_active: models.BooleanField[bool]

    diary_set: RelatedManager[Diary]
    mindfulnesslog_set: RelatedManager[MindfulnessLog]
    exerciselog_set: RelatedManager[ExerciseLog]

    object: UsersManager
    groups: None = None
    user_permissions: None = None

    def __str__(self) -> str:
        return self.username
