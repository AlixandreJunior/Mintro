from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore
        model = Activity
        fields = ("id", "name")


class DiarySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    activities_ids = serializers.StringRelatedField(
        queryset=Activity.objects.all(),
        many=True,
        write_only=True,
        source="activities",
        required=False,
    )

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
            "activities_ids",
            "photo",
        )
        read_only_fields = ("user",)
