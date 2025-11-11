from django.db import models

from apps.user.models.user import User


class HydrationLog(models.Model):
    """
    Representa um registro de hidratação de um usuário.
    Armazena a quantidade de água ingerida em um determinado dia.
    Cada usuário pode ter múltiplos registros de hidratação ao longo do tempo.
    """

    class Meta:
        verbose_name = "Hydration"
        verbose_name_plural = "Hydration"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Monitoramento de hidratação de {self.user.username} em {self.date}"
