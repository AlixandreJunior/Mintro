from rest_framework import serializers

from ..models.steps import StepLog


class StepLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepLog
        fields = ["id", "user", "date", "steps"]
        read_only_fields = ["id", "user", "date"]
