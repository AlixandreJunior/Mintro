from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from apps.user.models import User
from utils.choices import DiaryMoodChoices
from utils.signals_callable import create_achievements
from utils.validate_type_img import validate_image_type


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
        ordering = ("-created_at",)
        indexes = (
            models.Index(fields=["user", "created_at"]),
            models.Index(fields=["mood"]),
        )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    mood = models.CharField(max_length=20, choices=DiaryMoodChoices.choices)
    activities = models.ManyToManyField(Activity, blank=True)  # type: ignore
    photo = models.ImageField(
        upload_to="diary/photos/",
        null=True,
        blank=True,
        validators=[validate_image_type],
    )

    def __str__(self) -> str:
        return (
            f"Diário de {self.user.username} em {self.created_at.strftime('%d/%m/%Y')}"
        )

    def __repr__(self) -> str:
        return f"<Diary id={self.pk} user={self.user} title={self.title!r}>"


@receiver(models.signals.post_migrate)
def create_default_activities(
    sender: object, app_config: object, **kwargs: object
) -> None:
    create_achievements(sender, **kwargs)


@receiver(models.signals.post_delete, sender=Diary)
def delete_diary_photo_on_delete(
    sender: object, instance: Diary, **kwargs: object
) -> None:
    if instance.photo:
        instance.photo.delete(save=False)


@receiver(models.signals.pre_save, sender=Diary)
def delete_old_diary_photo_on_change(
    sender: object, instance: Diary, **kwargs: object
) -> None:
    if not instance.pk:
        return

    try:
        old_instance = Diary.objects.get(pk=instance.pk)
    except Diary.DoesNotExist:
        return

    if old_instance.photo and old_instance.photo != instance.photo:
        old_instance.photo.delete(save=False)
