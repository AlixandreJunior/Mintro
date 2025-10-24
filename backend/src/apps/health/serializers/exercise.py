from rest_framework import serializers

from apps.health.models.exercise import Exercise, ExerciseLog


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore
        model = Exercise
        fields = ("id", "name", "type", "is_distance")


class ExerciseLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:  # type: ignore
        model = ExerciseLog
        fields = (
            "id",
            "user",
            "exercise",
            "duration",
            "distance",
            "description",
            "datetime",
        )
        read_only_fields = ("id", "user", "exercise", "datetime")
