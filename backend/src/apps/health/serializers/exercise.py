from typing import ClassVar

from rest_framework import serializers

from apps.health.models.exercise import Exercise, ExerciseLog


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields: ClassVar[list[str]] = ["id", "name", "type", "is_distance"]


class ExerciseLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:
        model = ExerciseLog
        fields: ClassVar[list[str]] = [
            "id",
            "user",
            "exercise",
            "duration",
            "distance",
            "description",
            "datetime",
        ]
        read_only_fields: ClassVar[list[str]] = ["id", "user", "exercise", "datetime"]

    def create(self, validated_data: object) -> any:
        exercise = validated_data.pop("exercise", None)
        if exercise is not None:
            validated_data["exercise_id"] = exercise.id
        return super().create(validated_data)
