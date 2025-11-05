from django.db import models
from django.dispatch import receiver

from apps.user.models.user import User
from utils.signals_callable import (
    create_initial_achievements,
    grant_welcome_achievement,
)


@receiver(models.signals.post_migrate)
def create_achievements(sender: object, **kwargs: object) -> None:
    create_initial_achievements(sender, **kwargs)


@receiver(models.signals.post_save, sender=User)
def welcome_achievement(
    sender: object, instance: object, *, created: bool, **kwargs: object
) -> None:
    grant_welcome_achievement(sender, instance, created, **kwargs)
