"""Sinal responsável por criar exercícios padrão após a migração do banco.

Este módulo registra um sinal `post_migrate` que insere automaticamente
exercícios pré-definidos na tabela `Exercise` caso ainda não existam.
Isso garante que o sistema possua opções básicas de atividades físicas
disponíveis desde o início.

Exercícios criados por padrão:
    - Corrida (aeróbico, com distância)
    - Caminhada (aeróbico, com distância)
    - Treino (força, sem distância)
    - Natação (aeróbico, com distância)
    - Bicicleta (aeróbico, com distância)
    - Esporte (aeróbico, sem distância)
"""

from django.db import models
from django.dispatch import receiver

from apps.health.models.exercise import Exercise
from utils.choices import ExerciseTypeChoices


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
