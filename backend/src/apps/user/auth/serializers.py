from typing import TypedDict

from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers


class Attrs(TypedDict):
    user: AbstractUser | None
    email: str
    password: str


class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs: dict[str, object]) -> dict[str, object]:
        user = authenticate(email=attrs["email"], password=attrs["password"])

        if isinstance(user, AbstractUser):
            attrs["user"] = user
            return attrs

        raise serializers.ValidationError({"detail": "Usuário ou senha incorretos!!"})
