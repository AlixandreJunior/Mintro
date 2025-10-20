from datetime import date as date_type
from datetime import time

from django.db import models
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from apps.user.models.user import User

class Reminder(models.Model):
    class TypeChoices(models.TextChoices):
        Hydration = "HD", _("Hydration")
        Exercise = "EX", _("Exercise")
        Mindfulness = "MD", _("Mindfulness")
        Diary = "DR", _("Diary")
        Others = "OT", _("Others")

    user: models.ForeignKey[User]
    title: models.CharField[str]
    content: models.CharField[str]
    date: models.DateField[date_type]
    deadline: models.DateField[date_type]
    time: models.TimeField[time]
    type: models.CharField[str]
    is_daily: models.BooleanField[bool]

@receiver(models.signals.post_save, sender=Reminder)
def delete_expired_reminders(sender: Reminder, **kwargs: object) -> None: ...
