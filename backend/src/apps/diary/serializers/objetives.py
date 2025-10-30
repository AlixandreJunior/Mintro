from datetime import date, datetime
from typing import Any, cast

from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer
from utils.calculate import best_streak, conclusion_count, streak, success_rate_average
from utils.validate import validate_objective_limits


class ObjectiveSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    activities = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(), source="activity", write_only=True
    )

    class Meta:  # type: ignore
        model = Objective
        fields = (
            "id",
            "user",
            "activity",
            "activities",
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
        if not hasattr(obj, "_cached_diary_dates"):
            diary_datetimes = Diary.objects.filter(
                user=obj.user,
                activities=obj.activity,
                datetime__gte=obj.created_at,
            ).values_list("datetime", flat=True)
            cached_dates = sorted(dt.date() for dt in diary_datetimes)

            obj.cached_diary_dates = cast("list[date]", cached_dates)  # type: ignore

        return cast("list[date]", obj._cached_diary_dates)  # type: ignore # noqa: SLF001

    def _week_count(self, dates: list[date]) -> int:
        current_week = datetime.now().isocalendar()[1]
        return sum(1 for d in dates if d.isocalendar()[1] == current_week)

    def to_representation(self, instance: Objective) -> dict[str, Any]:
        data = super().to_representation(instance)
        dates = self.get_diary_dates(instance)

        data.update(
            {
                "diary_dates": dates,
                "days_with": len(dates),
                "week_count": self._week_count(dates),
                "streak": streak(dates),
                "best_streak": best_streak(dates),
                "success_rate_average": success_rate_average(instance),
                "conclusion_count": conclusion_count(instance, dates),
            }
        )
        return data

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        user = self.context["request"].user
        activity = attrs.get("activity")

        if activity:
            current_objectives = Objective.objects.filter(user=user)
            validate_objective_limits(current_objectives, activity, 3)

        return attrs
