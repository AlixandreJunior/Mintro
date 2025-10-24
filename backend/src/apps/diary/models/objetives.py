from django.db import models

from apps.diary.models.diary import Activity
from apps.user.models import User
from utils.choices import ObjectivePeriodChoices, ObjectiveRepeatChoices


class Objective(models.Model):
    class Meta:
        verbose_name = "Objective"
        verbose_name_plural = "Objectives"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    period = models.CharField(
        max_length=2,
        choices=ObjectivePeriodChoices.choices,
        default=ObjectivePeriodChoices.ONE_WEEK,
    )
    repeat = models.CharField(
        max_length=2,
        choices=ObjectiveRepeatChoices.choices,
        default=ObjectiveRepeatChoices.ONE_TIME,
    )
    best_streak = models.PositiveIntegerField(
        default=0,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Objetivos de {self.user.username}"
