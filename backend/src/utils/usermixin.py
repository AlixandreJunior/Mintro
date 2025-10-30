from __future__ import annotations

from apps.user.models import User


class UserMixin:
    def _create_user(
        self,
        *,
        first_name: str,
        last_name: str,
        username: str,
        password: str,
        email: str,
        is_active: bool,
        authenticate: bool = False,
    ) -> User:
        user = User.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            is_active=is_active,
        )
        user.set_password(password)
        user.save()

        if authenticate:
            self.client.force_authenticate(user)  # type: ignore[attr-defined]

        return user

    def make_user_auth(
        self,
        first_name: str = "user",
        last_name: str = "name",
        username: str = "username",
        password: str = "SenhaMuitoSegura123",  # noqa
        email: str = "username@email.com",
    ) -> User:
        return self._create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
            is_active=True,
            authenticate=True,
        )

    def make_user_not_auth(
        self,
        first_name: str = "user2",
        last_name: str = "name2",
        username: str = "username2",
        password: str = "SenhaMuitoSegura321",  # noqa
        email: str = "username2@email.com",
    ) -> User:
        return self._create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
            is_active=True,
            authenticate=False,
        )

    def make_user_not_active(
        self,
        first_name: str = "user3",
        last_name: str = "name3",
        username: str = "username3",
        password: str = "SenhaMuitoSegura213",  # noqa
        email: str = "username3@email.com",
    ) -> User:
        return self._create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
            is_active=False,
            authenticate=False,
        )
