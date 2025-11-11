from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from apps.user.models.reminder import Reminder


@receiver(models.signals.post_save, sender=Reminder)
def delete_expired_reminders(sender: Reminder, **kwargs: object) -> None:
    now = timezone.now().date()
    Reminder.objects.filter(deadline__isnull=False, deadline__lt=now).delete()
