from datetime import date

from django.db import models

from apps.diary.models.diary import Activity
from apps.user.models import User
from utils.choices import ObjectiveRepeatChoices


class Objective(models.Model):
    """Representa um objetivo definido por um usuário para uma atividade específica.

    Attributes:
        user (User): Usuário que criou o objetivo.
        activity (Activity): Atividade associada ao objetivo.
        repeat (str): Frequência de repetição do objetivo.
        created_at (datetime): Data e hora de criação do objetivo.
    """

    _cached_diary_dates: list[date] | None = None

    class Meta:
        verbose_name = "Objetivo"
        verbose_name_plural = "Objetivos"
        ordering = ("-created_at",)
        indexes = (
            models.Index(fields=["user", "created_at"]),
            models.Index(fields=["activity"]),
        )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    repeat = models.CharField(
        max_length=2,
        choices=ObjectiveRepeatChoices.choices,
        default=ObjectiveRepeatChoices.ONE_TIME,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        """Retorna uma representação legível do objetivo."""
        return f"{self.activity.name} - {self.user.username}"
