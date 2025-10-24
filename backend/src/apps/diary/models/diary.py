from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from apps.user.models import User
from utils.choices import DiaryMoodChoices
from utils.signals_callable import create_achievements


class Activity(models.Model):
    class Meta:
        verbose_name = "Atividade"
        verbose_name_plural = "Atividades"

    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f"{self.name}"


class Diary(models.Model):
    class Meta:
        verbose_name = "Diário"
        verbose_name_plural = "Diários"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    datetime = models.DateTimeField(default=timezone.now)
    mood = models.CharField(max_length=20, choices=DiaryMoodChoices.choices)
    activities = models.ManyToManyField(Activity, blank=True)  # type: ignore
    photo = models.ImageField(upload_to="diary/photos/", null=True, blank=True)

    def __str__(self) -> str:
        return f"Diário de {self.user.username} em {self.datetime.strftime('%d/%m/%Y')}"


@receiver(models.signals.post_migrate)
def create_default_activities(
    sender: object, app_config: object, **kwargs: object
) -> None:
    create_achievements(sender, **kwargs)
