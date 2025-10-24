from rest_framework import serializers

from apps.health.models.mindfulness import Mindfulness, MindfulnessLog


class MindfulnessSerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore
        model = Mindfulness
        fields = ("id", "name", "type")


class MindfulnessLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    mindfulness = MindfulnessSerializer(read_only=True)

    class Meta:  # type: ignore
        model = MindfulnessLog
        fields = (
            "id",
            "user",
            "mindfulness",
            "duration",
            "description",
            "datetime",
        )
        read_only_fields = (
            "id",
            "user",
            "mindfulness",
            "datetime",
        )
