from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore
        model = Activity
        fields = ("id", "name")


class DiarySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    activity = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(),
        many=True,
        write_only=True,
        source="activities",
        required=False,
    )

    user = serializers.StringRelatedField(read_only=True)

    class Meta:  # type: ignore
        model = Diary
        fields = (
            "id",
            "user",
            "title",
            "content",
            "datetime",
            "mood",
            "activities",
            "activity",
            "photo",
        )
        ordering = ("-datetime",)
