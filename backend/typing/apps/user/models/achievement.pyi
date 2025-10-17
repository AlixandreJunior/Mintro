from datetime import date

from django.db import models
from django.dispatch import receiver

from apps.user.models.user import User

class Achievement(models.Model):
    name: models.CharField[str]
    description: models.TextField[str]

    def __str__(self) -> str: ...

class AchievementLevel(models.Model):
    achievement: models.ForeignKey[Achievement]
    level: models.PositiveIntegerField[int]
    condition: models.CharField[str]
    description: models.TextField[str]

    def __str__(self) -> str: ...

class AchievementLog(models.Model):
    user: models.ForeignKey[User]
    achievement_level: models.ForeignKey[AchievementLevel]
    date_awarded: models.DateField[date]

    def __str__(self) -> str: ...

@receiver(models.signals.post_migrate)
def create_initial_achievements(sender: object, **kwargs: object) -> None: ...
@receiver(models.signals.post_save, sender=User)
def grant_welcome_achievement(
    sender: User, instance: object, created: object, **kwargs: object
) -> None: ...
