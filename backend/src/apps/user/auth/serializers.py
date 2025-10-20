from typing import TypedDict

from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers


class Data(TypedDict):
    user: AbstractUser | None
    email: str
    password: str


class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data: Data) -> AbstractUser:
        user = authenticate(email=data["email"], password=data["password"])

        if isinstance(user, AbstractUser):
            data["user"] = user
            return data

        raise serializers.ValidationError({"detail": "Usuário ou senha incorretos!!"})
