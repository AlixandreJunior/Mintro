from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from rest_framework import serializers

from apps.user.models.user import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    diarys_registers = serializers.SerializerMethodField()
    mindfulness_registers = serializers.SerializerMethodField()
    exercises_registers = serializers.SerializerMethodField()

    class Meta:  # type: ignore
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "diarys_registers",
            "mindfulness_registers",
            "exercises_registers",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_diarys_registers(self, obj: User) -> int:
        return obj.diary_set.count()

    def get_mindfulness_registers(self, obj: User) -> int:
        return obj.mindfulnesslog_set.count()

    def get_exercises_registers(self, obj: User) -> int:
        return obj.exerciselog_set.count()

    def validate_password(self, value: str) -> str:
        try:
            password_validation.validate_password(value, self.instance)
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)}) from e
        return value

    def create(self, validated_data: dict[str, str]) -> User:
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance: User, validated_data: dict[str, str]) -> User:
        password = validated_data.pop("password", None)

        super().update(instance, validated_data)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
