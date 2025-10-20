from typing import TypedDict

from backend.src.apps.user.models.achievement import (
    Achievement,
    AchievementLevel,
    AchievementLog,
)

type Level = tuple[int, str, str]


class AchievementType(TypedDict):
    name: str
    description: str
    levels: list[Level]


def create_initial_achievements(sender: object, **kwargs: object) -> None:
    achievements: list[AchievementType] = [
        {
            "name": "Bem-vindo ao Mintro",
            "description": "Avance no tempo de uso da conta.",
            "levels": [
                (1, "Criou a conta.", "login_1x"),
            ],
        },
        {
            "name": "Foco Total",
            "description": "Registre exercícios físicos para manter o foco.",
            "levels": [
                (1, "Registre 1 exercício.", "exercise_1x"),
                (2, "Registre 500 exercícios.", "exercise_500x"),
                (3, "Registre 5000 exercícios.", "exercise_5000x"),
            ],
        },
        {
            "name": "Gole a Gole",
            "description": "Mantenha uma rotina saudável de hidratação.",
            "levels": [
                (1, "Registre 1 ingestão de água.", "water_1x"),
                (2, "Registre 1000 ingestões de água.", "water_1000x"),
                (3, "Registre 10000 ingestões de água.", "water_10000x"),
            ],
        },
        {
            "name": "Zen Total",
            "description": "Pratique mindfulness para equilibrar a mente.",
            "levels": [
                (1, "Registre 1 prática de mindfulness.", "mindfulness_1x"),
                (2, "Registre 500 práticas de mindfulness.", "mindfulness_500x"),
                (3, "Registre 5000 práticas de mindfulness.", "mindfulness_5000x"),
            ],
        },
        {
            "name": "Narrador da própria história",
            "description": "Mantenha o hábito de registrar seu diário.",
            "levels": [
                (1, "Faça 1 registro no diário.", "diary_1x"),
                (2, "Faça 500 registros no diário.", "diary_500x"),
                (3, "Faça 5000 registros no diário.", "diary_5000x"),
            ],
        },
    ]

    for ach in achievements:
        achievement_obj = Achievement.objects.get_or_create(
            name=ach["name"],
            defaults={"description": ach["description"]},
        )

        for level, desc, condition in ach["levels"]:
            AchievementLevel.objects.get_or_create(
                achievement=achievement_obj,
                level=level,
                defaults={"description": desc, "condition": condition},
            )


def grant_welcome_achievement(
    sender: object, instance: object, created: object, **kwargs: object
) -> None:
    if created:
        try:
            achievement = Achievement.objects.get(name="Bem-vindo ao Mintro")
            level = AchievementLevel.objects.get(achievement=achievement, level=1)
            if not AchievementLog.objects.filter(
                user=instance, achievement_level=level
            ).exists():
                AchievementLog.objects.create(user=instance, achievement_level=level)
        except Achievement.DoesNotExist:
            pass
        except AchievementLevel.DoesNotExist:
            pass
