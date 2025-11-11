from typing import TYPE_CHECKING

from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

if TYPE_CHECKING:
    from django.db.models.manager import Manager

    from apps.diary.models.diary import Diary
    from apps.health.models.exercise import ExerciseLog
    from apps.health.models.mindfulness import MindfulnessLog


class User(AbstractUser):
    """
    Modelo personalizado de usuário que estende `AbstractUser`.

    Este modelo adiciona campos e relacionamentos extras utilizados no sistema,
    incluindo logs de diário, exercícios e mindfulness.
    O campo `groups` e `user_permissions` foram desabilitados, pois o controle de
    acesso é tratado de forma personalizada.

    Attributes:
        created_at (datetime): Data e hora de criação do usuário.
        is_active (bool): Indica se o usuário está ativo e pode autenticar-se.
        diary_set (Manager[Diary]): Relacionamento reverso com registros de diário.
        mindfulnesslog_set (Manager[MindfulnessLog]): Relacionamento reverso com logs de
        mindfulness.
        exerciselog_set (Manager[ExerciseLog]): Relacionamento reverso com logs de
        exercício.
    """

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

    # Desabilita grupos e permissões para evitar comportamento padrão do AbstractUser
    groups = None
    user_permissions = None

    def __str__(self) -> str:
        """Retorna o nome de usuário como representação textual."""
        return self.username
