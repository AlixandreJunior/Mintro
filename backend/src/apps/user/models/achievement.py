from backend.src.apps.user.models.user import User
from backend.src.utils.choices import AchievementLevelChoices
from backend.src.utils.signals_callable import (
    create_initial_achievements,
    grant_welcome_achievement,
)
from django.db import models
from django.dispatch import receiver


class Achievement(models.Model):
    class Meta:
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self) -> str:
        return self.name


class AchievementLevel(models.Model):
    class Meta:
        verbose_name = "Achievement Level"
        verbose_name_plural = "Achievement Levels"
        unique_together = ("achievement", "level")

    achievement = models.ForeignKey(
        Achievement, on_delete=models.CASCADE, related_name="levels"
    )
    level = models.PositiveSmallIntegerField(choices=AchievementLevelChoices.choices)
    condition = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self) -> str:
        return f"{self.achievement.name} - Nível {self.level}"


class AchievementLog(models.Model):
    class Meta:
        verbose_name = "Achievement Log"
        verbose_name_plural = "Achievement Logs"
        unique_together = ("user", "achievement_level")

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement_level = models.ForeignKey(AchievementLevel, on_delete=models.CASCADE)
    date_awarded = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user.username} - {self.achievement_level}"


@receiver(models.signals.post_migrate)
def create_achievements(sender: object, **kwargs: object) -> None:
    create_initial_achievements(sender, **kwargs)


@receiver(models.signals.post_save, sender=User)
def welcome_achievement(
    sender: object, instance: object, created: object, **kwargs: object
) -> None:
    grant_welcome_achievement(sender, instance, created, **kwargs)
