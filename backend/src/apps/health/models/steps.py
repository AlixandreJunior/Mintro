from django.db import models

from apps.user.models.user import User


class StepLog(models.Model):
    """
    Representa o registro diário de passos dados por um usuário.
    Armazena o número total de passos em uma determinada data,
    permitindo acompanhar a evolução da atividade física ao longo do tempo.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="step_logs")
    date = models.DateField(auto_now_add=True)
    steps = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.user.username} - {self.date} - {self.steps} steps"
