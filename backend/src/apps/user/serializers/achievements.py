from typing import ClassVar

from rest_framework import serializers

from apps.user.models.achievement import Achievement, AchievementLevel, AchievementLog


class AchievementLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementLevel
        fields: ClassVar[list[str]] = [
            "id",
            "achievement",
            "level",
            "condition",
            "description",
        ]
        read_only_fields: ClassVar[list[str]] = ["id", "achievement"]


class AchievementSerializer(serializers.ModelSerializer):
    levels = AchievementLevelSerializer(many=True, read_only=True)

    class Meta:
        model = Achievement
        fields: ClassVar[list[str]] = [
            "id",
            "name",
            "description",
            "levels",
        ]
        read_only_fields: ClassVar[list[str]] = ["id"]


class AchievementLogSerializer(serializers.ModelSerializer):
    achievement_level = AchievementLevelSerializer(read_only=True)

    class Meta:
        model = AchievementLog
        fields: ClassVar[list[str]] = [
            "id",
            "user",
            "achievement_level",
            "date_awarded",
        ]
        read_only_fields: ClassVar[list[str]] = [
            "id",
            "user",
            "achievement_level",
            "date_awarded",
        ]
