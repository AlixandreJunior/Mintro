from datetime import date

from backend.src.apps.user.models.reminder import Reminder
from django.utils import timezone
from rest_framework import serializers


class ReminderSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source="get_type_display", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)

    class Meta(serializers.ModelSerializer.Meta):
        model = Reminder
        fields = (
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
        )
        read_only_fields = ("id", "type_display")

    def validate_deadline(self, value: date) -> date:
        if value and value < timezone.now().date():
            error_message = "O prazo (deadline) não pode ser uma data passada."
            raise serializers.ValidationError(error_message)
        return value
