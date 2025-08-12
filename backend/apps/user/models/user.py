from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.models.goals import Goal
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.dispatch import receiver


class UsersManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O e-mail é obrigatório!")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    class Meta:
        app_label = "user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    objects = UsersManager()
    groups = None
    user_permissions = None

    def __str__(self):
        return self.username


@receiver(models.signals.post_save, sender=User)
def create_object_goal_for_user(sender, instance, created, **kwargs):
    if created:
        Goal.objects.get_or_create(user=instance)


@receiver(models.signals.post_save, sender=User)
def grant_welcome_achievement(sender, instance, created, **kwargs):
    if created:
        try:
            achievement = Achievement.objects.get(name="Bem-vindo ao Mintro")
            level = achievement.levels.get(level=1)
            if not AchievementLog.objects.filter(
                user=instance, achievement_level=level
            ).exists():
                AchievementLog.objects.create(user=instance, achievement_level=level)
        except Achievement.DoesNotExist:
            pass
