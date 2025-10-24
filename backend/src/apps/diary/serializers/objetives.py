from datetime import date
from typing import Any

from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer
from utils.calculate import calculate_objective_metrics
from utils.validate import validate_objective_limits


class ObjectiveSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    activity_id = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(), source="activity", write_only=True
    )

    # Campos derivados
    week_count = serializers.SerializerMethodField()
    days_with = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()
    best_streak = serializers.SerializerMethodField()
    success_rate_average = serializers.SerializerMethodField()
    conclusion_count = serializers.SerializerMethodField()
    diary_dates = serializers.SerializerMethodField()

    class Meta:  # type:ignore
        model = Objective
        fields = (
            "id",
            "user",
            "activity",
            "activity_id",
            "period",
            "repeat",
            "created_at",
            "week_count",
            "days_with",
            "streak",
            "best_streak",
            "success_rate_average",
            "conclusion_count",
            "diary_dates",
        )
        read_only_fields = (
            "id",
            "user",
            "activity",
            "week_count",
            "days_with",
            "streak",
            "best_streak",
            "success_rate_average",
            "conclusion_count",
            "diary_dates",
            "created_at",
        )

    def get_diary_dates(self, obj: Objective) -> list[date]:
        if not hasattr(self, "_cached_diary_dates"):
            self._cached_diary_dates = sorted(
                {
                    dt.date()
                    for dt in Diary.objects.filter(
                        user=obj.user,
                        activities=obj.activity,
                        datetime__gte=obj.created_at,
                    ).values_list("datetime", flat=True)
                }
            )
        return self._cached_diary_dates

    def to_representation(self, instance: Objective) -> object:
        data = super().to_representation(instance)
        dates = self.get_diary_dates(instance)
        data["diary_dates"] = dates
        data.update(calculate_objective_metrics(instance, dates))
        return data

    def validate(self, attrs: dict[str, Any]) -> dict[str, object]:
        user = self.context["request"].user
        activity: Activity | None = attrs.get("activity")
        current_objectives = Objective.objects.filter(user=user)
        validate_objective_limits(current_objectives, activity)
        return attrs
