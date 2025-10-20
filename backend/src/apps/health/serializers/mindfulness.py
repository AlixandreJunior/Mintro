from typing import ClassVar

from rest_framework import serializers

from apps.health.models.mindfulness import Mindfulness, MindfulnessLog


class MindfulnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mindfulness
        fields: ClassVar[list[str]] = ["id", "name", "type"]


class MindfulnessLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    mindfulness = MindfulnessSerializer(read_only=True)

    class Meta:
        model = MindfulnessLog
        fields: ClassVar[list[str]] = [
            "id",
            "user",
            "mindfulness",
            "duration",
            "description",
            "datetime",
        ]
        read_only_fields: ClassVar[list[str]] = [
            "id",
            "user",
            "mindfulness",
            "datetime",
        ]

    def create(self, validated_data: object) -> any:
        mindfulness = validated_data.pop("mindfulness", None)
        if mindfulness is not None:
            validated_data["mindfulness_id"] = mindfulness.id
        return super().create(validated_data)
