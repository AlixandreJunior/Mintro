from django.db import models
from django.utils import timezone

from apps.user.models.user import User
from utils.choices import MindfulnessTypeChoices


class Mindfulness(models.Model):
    """
    Representa uma prática de mindfulness disponível no sistema,
    como meditação, respiração guiada ou relaxamento corporal.
    Cada prática possui um nome e um tipo definido por `MindfulnessTypeChoices`.
    """

    class Meta:
        verbose_name = "Mindfulness"
        verbose_name_plural = "Mindfulness"

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=22, choices=MindfulnessTypeChoices.choices)

    def __str__(self) -> str:
        """
        Retorna uma representação textual da prática de mindfulness.
        """
        return f"Mindfulness {self.name}"


class MindfulnessLog(models.Model):
    """
    Armazena um registro de uma sessão de mindfulness realizada por um usuário.
    Contém informações sobre o tipo de prática, duração,
    descrição e data/hora da atividade.
    """

    class Meta:
        verbose_name = "Mindfulness Log"
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()
    description = models.TextField(max_length=200)
    datetime = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"Registro de Mindfulness de {self.user.username} em {self.datetime}"
