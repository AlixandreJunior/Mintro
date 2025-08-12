from apps.user.models import User
from django.db import models
from django.dispatch import receiver


class Achievement(models.Model):
    class Meta:
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    name = models.CharField(max_length=100)
    description = models.TextField(help_text="Descrição geral da conquista.")

    def __str__(self):
        return self.name


class AchievementLevel(models.Model):
    class Meta:
        verbose_name = "Achievement Level"
        verbose_name_plural = "Achievement Levels"
        unique_together = ("achievement", "level")

    LEVEL_CHOICES = [
        (1, "Fácil"),
        (2, "Intermediário"),
        (3, "Difícil"),
    ]

    achievement = models.ForeignKey(
        Achievement, on_delete=models.CASCADE, related_name="levels"
    )
    level = models.PositiveSmallIntegerField(choices=LEVEL_CHOICES)
    condition = models.CharField(
        max_length=150, help_text="Critério para desbloquear este nível."
    )
    description = models.TextField(help_text="Descrição específica deste nível.")

    def __str__(self):
        return f"{self.achievement.name} - Nível {self.level}"


class AchievementLog(models.Model):
    class Meta:
        verbose_name = "Achievement Log"
        verbose_name_plural = "Achievement Logs"
        unique_together = ("user", "achievement_level")

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement_level = models.ForeignKey(AchievementLevel, on_delete=models.CASCADE)
    date_awarded = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.achievement_level}"


@receiver(models.signals.post_migrate)
def create_initial_achievements(sender, **kwargs):
    ACHIEVEMENTS = [
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

    for ach in ACHIEVEMENTS:
        achievement_obj, created = Achievement.objects.get_or_create(
            name=ach["name"],
            defaults={"description": ach["description"]},
        )

        for level, desc, condition in ach["levels"]:
            AchievementLevel.objects.get_or_create(
                achievement=achievement_obj,
                level=level,
                defaults={"description": desc, "condition": condition},
            )
