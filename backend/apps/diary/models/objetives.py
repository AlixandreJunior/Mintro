from apps.diary.models.diary import Activity
from apps.user.models import User
from django.db import models


class Objective(models.Model):
    class Meta:
        verbose_name = "Objective"
        verbose_name_plural = "Objectives"

    class PeriodChoices(models.TextChoices):
        ONE_WEEK = "1w", "1 semana"
        TWO_WEEKS = "2w", "2 semanas"
        THREE_WEEKS = "3w", "3 semanas"

    class RepeatChoices(models.TextChoices):
        ONE_TIME = "1x", "1 Vez"
        THREE_TIMES = "3x", "2 Vezes"
        FIVE_TIMES = "5x", "3 Vezes"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    period = models.CharField(
        max_length=2, choices=PeriodChoices.choices, default=PeriodChoices.ONE_WEEK
    )
    repeat = models.CharField(
        max_length=2,
        choices=RepeatChoices.choices,
        default=RepeatChoices.ONE_TIME,
    )
    best_streak = models.PositiveIntegerField(
        default=0,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Objetivos de {self.user.username}"
