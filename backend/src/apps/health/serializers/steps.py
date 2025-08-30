from rest_framework import serializers

from ..models.steps import StepLog


class StepLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepLog
        fields = ["id", "user", "date", "steps"]
        read_only_fields = ["id", "user", "date"]

    def create(self, validated_data):
        user = self.context["request"].user
        steps = validated_data.get("steps", 0)
        obj, created = StepLog.objects.update_or_create(
            user=user,
            date=validated_data.get("date", None),
            defaults={"steps": steps},
        )
        return obj
