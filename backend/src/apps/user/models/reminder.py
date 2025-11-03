from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from apps.user.models.user import User
from utils.choices import ReminderTypeChoices


class Reminder(models.Model):
    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=56)
    content = models.CharField(max_length=256)
    date = models.DateField(default=timezone.now)
    deadline = models.DateField()
    time = models.TimeField(auto_now_add=True)
    type = models.CharField(max_length=2, choices=ReminderTypeChoices.choices)
    is_daily = models.BooleanField(default=False)


@receiver(models.signals.post_save, sender=Reminder)
def delete_expired_reminders(sender: Reminder, **kwargs: object) -> None:
    now = timezone.now().date()
    Reminder.objects.filter(deadline__isnull=False, deadline__lt=now).delete()
