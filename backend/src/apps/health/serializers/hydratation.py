from apps.health.models.hydratation import HydrationLog
from rest_framework import serializers


class HydrationLogSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = HydrationLog
        fields = ["id", "user", "quantity", "date"]
