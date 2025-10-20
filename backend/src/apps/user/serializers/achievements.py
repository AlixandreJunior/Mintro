from backend.src.apps.user.models.achievement import (
    Achievement,
    AchievementLevel,
    AchievementLog,
)
from rest_framework import serializers


class AchievementLevelSerializer(serializers.ModelSerializer):
    class Meta(serializers.ModelSerializer.Meta):
        model = AchievementLevel
        fields = (
            "id",
            "achievement",
            "level",
            "condition",
            "description",
        )
        read_only_fields = "id", "achievement"


class AchievementSerializer(serializers.ModelSerializer):
    levels = AchievementLevelSerializer(many=True, read_only=True)

    class Meta(serializers.ModelSerializer.Meta):
        model = Achievement
        fields = (
            "id",
            "name",
            "description",
            "levels",
        )
        read_only_fields = ("id",)


class AchievementLogSerializer(serializers.ModelSerializer):
    achievement_level = AchievementLevelSerializer(read_only=True)

    class Meta(serializers.ModelSerializer.Meta):
        model = AchievementLog
        fields = (
            "id",
            "user",
            "achievement_level",
            "date_awarded",
        )
        read_only_fields = (
            "id",
            "user",
            "achievement_level",
            "date_awarded",
        )
