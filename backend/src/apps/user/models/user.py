from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UsersManager(BaseUserManager):
    def create_user(
        self, email: str, password: str | None = None, **extra_fields: object
    ) -> any:
        if not email:
            error_message = "O e-mail é obrigatório!"
            raise ValueError(error_message)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, email: str, password: str | None = None, **extra_fields: object
    ) -> any:
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

    def __str__(self) -> str:
        return self.username
