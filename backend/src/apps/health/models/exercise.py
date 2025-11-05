from django.db import models
from django.utils import timezone

from apps.user.models import User
from utils.choices import ExerciseTypeChoices


class Exercise(models.Model):
    """
    Representa um tipo de exercício físico disponível no sistema,
    como corrida, caminhada ou musculação.
    Cada exercício possui um tipo (ex: aeróbico, anaeróbico)
    e pode ou não estar associado a uma medida de distância.
    """

    class Meta:
        verbose_name = "Exercise"
        verbose_name_plural = "Exercises"

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=ExerciseTypeChoices.choices)
    is_distance = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Exercicio {self.name}"


class ExerciseLog(models.Model):
    """
    Armazena um registro de execução de um exercício realizado por um usuário.
    Inclui informações como duração, distância (quando aplicável),
    descrição e data/hora da atividade.
    """

    class Meta:
        verbose_name = "Registro de Exercircio"
        verbose_name_plural = "Registros de Exercircio"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()
    distance = models.PositiveIntegerField(blank=True, null=True)
    description = models.TextField(max_length=200, blank=True)
    datetime = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"Registro de Exercircio de {self.user.username}"
