from django.db import models
from django.dispatch import receiver
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
    description = models.TextField(max_length=200, blank=True)
    datetime = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"Registro de Exercircio de {self.user.username}"


@receiver(models.signals.post_migrate)
def create_default_exercises(sender: type[models.Model], **kwargs: object) -> None:
    """Cria exercícios padrão após a execução das migrações.

    Args:
        sender (type[models.Model]): Modelo que enviou o sinal.
        **kwargs (object): Argumentos adicionais do sinal.

    Returns:
        None: Esta função não retorna nada. Apenas garante
        que os registros básicos de `Exercise` existam.
    """
    default_exercises: list[dict[str, object]] = [
        {"name": "Corrida", "type": ExerciseTypeChoices.AEROBICO, "is_distance": True},
        {
            "name": "Caminhada",
            "type": ExerciseTypeChoices.AEROBICO,
            "is_distance": True,
        },
        {"name": "Treino", "type": ExerciseTypeChoices.FORCA, "is_distance": False},
        {"name": "Natação", "type": ExerciseTypeChoices.AEROBICO, "is_distance": True},
        {
            "name": "Bicicleta",
            "type": ExerciseTypeChoices.AEROBICO,
            "is_distance": True,
        },
        {"name": "Esporte", "type": ExerciseTypeChoices.AEROBICO, "is_distance": False},
    ]

    for exercise_data in default_exercises:
        Exercise.objects.get_or_create(
            name=exercise_data["name"],
            defaults={
                "type": exercise_data["type"],
                "is_distance": exercise_data["is_distance"],
            },
        )
