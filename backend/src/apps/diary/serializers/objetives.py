from datetime import date, datetime
from typing import Any

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

    week_count = serializers.SerializerMethodField()
    days_with = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()
    best_streak = serializers.SerializerMethodField()
    success_rate_average = serializers.SerializerMethodField()
    conclusion_count = serializers.SerializerMethodField()
    diary_dates = serializers.SerializerMethodField()

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
                user=obj.user, activities=obj.activity, datetime__gte=obj.created_at
            ).values_list("datetime", flat=True)
            obj._cached_diary_dates = sorted(diary_datetimes)
        return [dt.date() for dt in obj._cached_diary_dates]

    def get_week_count(self, obj: Objective) -> int:
        dates = self.get_diary_dates(obj)
        today = datetime.now().date()
        current_week = today.isocalendar()[1]
        return sum(1 for d in dates if d.isocalendar()[1] == current_week)

    def get_days_with(self, obj: Objective) -> int:
        dates = self.get_diary_dates(obj)
        return len(dates)

    def get_streak(self, obj: Objective) -> int:
        dates = self.get_diary_dates(obj)
        return streak(dates)

    def get_best_streak(self, obj: Objective) -> int:
        dates = self.get_diary_dates(obj)
        return best_streak(dates)

    def get_success_rate_average(self, obj: Objective) -> float:
        return success_rate_average(obj)

    def get_conclusion_count(self, obj: Objective) -> int:
        dates = self.get_diary_dates(obj)
        return conclusion_count(obj, dates)

    def get_diary_dates_field(self, obj: Objective) -> list[date]:
        return self.get_diary_dates(obj)

    # -------------------------------
    # Serialização final
    # -------------------------------
    def to_representation(
        self, instance: Objective
    ) -> dict[str, int | float | list[date]]:
        data = super().to_representation(instance)
        dates = self.get_diary_dates(instance)
        data.update(
            {
                "diary_dates": dates,
                "days_with": len(dates),
                "week_count": self.get_week_count(instance),
                "streak": self.get_streak(instance),
                "best_streak": self.get_best_streak(instance),
                "success_rate_average": self.get_success_rate_average(instance),
                "conclusion_count": self.get_conclusion_count(instance),
            }
        )
        return data

    def validate(self, attrs: dict[str, Any]) -> dict[str, Any]:
        user = self.context["request"].user
        activity: Activity | None = attrs.get("activity")
        if activity is not None:
            current_objectives = Objective.objects.filter(user=user)
            validate_objective_limits(current_objectives, activity, 3)
        return attrs
