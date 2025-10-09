from typing import ClassVar

from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields: ClassVar[list[str]] = ["id", "name"]


class DiarySerializer(serializers.ModelSerializer):
    # Para leitura: exibe dados completos das atividades
    activities = ActivitySerializer(many=True, read_only=True)

    # Para escrita: recebe apenas IDs
    activity = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(),
        many=True,
        write_only=True,
        source="activities",
        required=False,
    )

    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Diary
        fields: ClassVar[list[str]] = [
            "id",
            "user",
            "title",
            "content",
            "datetime",
            "mood",
            "activities",  # leitura
            "activity",  # escrita
            "photo",
        ]
        ordering: ClassVar[list[str]] = ["-datetime"]
