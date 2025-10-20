from typing import TYPE_CHECKING

from backend.src.apps.diary.models.diary import Diary
from backend.src.apps.health.models.exercise import ExerciseLog
from backend.src.apps.health.models.mindfulness import MindfulnessLog
from backend.src.utils.manager import UsersManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.manager import RelatedManager

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager  # noqa: TC004


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
