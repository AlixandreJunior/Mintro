from datetime import date
from typing import ClassVar

from rest_framework import serializers

from apps.user.models.reminder import Reminder


class ReminderSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source="get_type_display", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)

    class Meta:
        model = Reminder
        fields: ClassVar[list[str]] = [
            "id",
            "user_id",
            "title",
            "content",
            "date",
            "deadline",
            "time",
            "type",
            "type_display",
            "is_daily",
        ]
        read_only_fields: ClassVar[list[str]] = ["id", "type_display"]

    def validate_deadline(self, value: date) -> date:
        from django.utils import timezone

        if value and value < timezone.now().date():
            error_message = "O prazo (deadline) não pode ser uma data passada."
            raise serializers.ValidationError(error_message)
        return value
