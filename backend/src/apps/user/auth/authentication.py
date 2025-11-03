from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import AbstractUser
from django.http.request import HttpRequest

User = get_user_model()


class EmailBackend(BaseBackend):
    def authenticate(
        self,
        request: HttpRequest,
        email: str | None = None,
        password: str | None = None,
        **kwargs: object,
    ) -> AbstractUser | None:
        if email is None:
            value = kwargs.get(AbstractUser.EMAIL_FIELD)
            if isinstance(value, str):
                email = value
        if not email or not password:
            return None
        try:
            user = User.objects.get(email=email)
        except AbstractUser.DoesNotExist:
            AbstractUser().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id: int) -> AbstractUser | None:
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def user_can_authenticate(self, user: AbstractUser) -> bool:
        return user.is_active
