from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from apps.user.models.user import User


class Reminder(models.Model):
    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"

    class TypeChoices(models.TextChoices):
        Hydration = "HD", _("Hydration")
        Exercise = "EX", _("Exercise")
        Mindfulness = "MD", _("Mindfulness")
        Diary = "DR", _("Diary")
        Others = "OT", _("Others")

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=56)
    content = models.CharField(max_length=256)
    date = models.DateField(default=timezone.now)
    deadline = models.DateField()
    time = models.TimeField(default=timezone.now)
    type = models.CharField(max_length=2, choices=TypeChoices.choices)
    is_daily = models.BooleanField(default=False)


@receiver(models.signals.post_save, sender=Reminder)
def delete_expired_reminders(sender: Reminder, **kwargs: any) -> None:
    now = timezone.now().date()
    Reminder.objects.filter(deadline__isnull=False, deadline__lt=now).delete()
