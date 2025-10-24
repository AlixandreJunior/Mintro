from typing import ClassVar

from rest_framework import serializers

from apps.health.models.hydratation import HydrationLog


class HydrationLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:  # type: ignore
        model = HydrationLog
        fields: ClassVar[list[str]] = ["id", "user", "quantity", "date"]
