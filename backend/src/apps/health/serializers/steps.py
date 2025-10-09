from typing import ClassVar

from rest_framework import serializers

from ..models.steps import StepLog


class StepLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepLog
        fields: ClassVar[list[str]] = ["id", "user", "date", "steps"]
        read_only_fields: ClassVar[list[str]] = ["id", "user", "date"]
