from typing import ClassVar

from django.contrib.auth import password_validation
from rest_framework import serializers

from apps.user.models.user import User


class UserReadSerializer(serializers.ModelSerializer):
    diarys_registers = serializers.SerializerMethodField()
    mindfulness_registers = serializers.SerializerMethodField()
    exercises_registers = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields: ClassVar[list[str]] = [
            "id",
            "username",
            "email",
            "diarys_registers",
            "mindfulness_registers",
            "exercises_registers",
            "created_at",
        ]
        read_only_fields = fields

    def get_diarys_registers(self, obj: object) -> int:
        return getattr(obj, "diary_set", []).count()

    def get_mindfulness_registers(self, obj: object) -> int:
        return getattr(obj, "mindfulnesslog_set", []).count()

    def get_exercises_registers(self, obj: object) -> int:
        return getattr(obj, "exerciselog_set", []).count()


class UserWriteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields: ClassVar[list[str]] = ["id", "username", "email", "password"]
        extra_kwargs: ClassVar[list[str]] = {
            "id": {"read_only": True},
        }

    def validate_password(self, value: str) -> str:
        try:
            password_validation.validate_password(value)
        except serializers.ValidationError as e:
            error = {"password": str(e)}
            raise serializers.ValidationError(error) from e
        return value

    def create(self, validated_data: object) -> User:
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance: object, validated_data: object) -> any:
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
