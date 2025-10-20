from datetime import date, timedelta
from typing import ClassVar

from django.utils import timezone
from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer


class ObjectiveSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    best_streak = serializers.SerializerMethodField()
    week_count = serializers.SerializerMethodField()
    days_with = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()
    conclusion_count = serializers.SerializerMethodField()
    success_rate_average = serializers.SerializerMethodField()
    diary_dates = serializers.SerializerMethodField()

    activity_id = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(), source="activity", write_only=True
    )

    class Meta:
        model = Objective
        fields: ClassVar[list[str]] = [
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
        ]
        read_only_fields: ClassVar[list[str]] = [
            "id",
            "user",
            "activity",
            "best_streak",
            "week_count",
            "days_with",
            "streak",
            "success_rate_average",
            "conclusion_count",
            "diary_dates",
            "created_at",
        ]

    def get_diary_dates(self, obj: object) -> list[date]:
        diaries = Diary.objects.filter(
            user=obj.user, activities=obj.activity, datetime__gte=obj.created_at
        ).order_by("datetime")
        return sorted({d.datetime.date() for d in diaries})

    def get_success_rate_average(self, obj: object) -> float:
        from collections import defaultdict

        diaries = Diary.objects.filter(user=obj.user, activities=obj.activity).order_by(
            "datetime"
        )

        try:
            match obj.repeat:
                case "1x":
                    repeat_target = 1
                case "3x":
                    repeat_target = 3
                case "5x":
                    repeat_target = 5
            if repeat_target <= 0:
                return 0.0
        except (ValueError, TypeError):
            return 0.0

        weeks = defaultdict(int)
        for diary in diaries:
            date = diary.datetime.date()
            week_key = date.isocalendar()[:2]
            weeks[week_key] += 1

        if not weeks:
            return 0.0

        weekly_rates = [min(count / repeat_target, 1.0) for count in weeks.values()]
        average_rate = sum(weekly_rates) / len(weekly_rates)
        return round(average_rate * 100, 2)

    def get_best_streak(self, obj: object) -> int:
        dates = self.get_diary_dates(obj)
        if not dates:
            return 0
        best = current = 1
        for i in range(1, len(dates)):
            if dates[i] == dates[i - 1] + timedelta(days=1):
                current += 1
                best = max(best, current)
            else:
                current = 1
        return best

    def get_streak(self, obj: object) -> int:
        dates = self.get_diary_dates(obj)
        if not dates:
            return 0
        streak = 1
        for i in range(len(dates) - 1, 0, -1):
            if dates[i] == dates[i - 1] + timedelta(days=1):
                streak += 1
            elif dates[i] != dates[i - 1]:
                break
        if dates[-1] < timezone.now().date() - timedelta(days=1):
            return 0
        return streak

    def get_week_count(self, obj: object) -> int:
        now = timezone.now().date()
        dates = self.get_diary_dates(obj)
        return len([d for d in dates if d.isocalendar()[1] == now.isocalendar()[1]])

    def get_days_with(self, obj: object) -> int:
        return len(self.get_diary_dates(obj))

    def get_conclusion_count(self, obj: object) -> int:
        from collections import defaultdict

        dates = self.get_diary_dates(obj)
        if not dates:
            return 0

        try:
            repeat_target = int(obj.repeat)
        except (ValueError, TypeError):
            repeat_target = 0

        weeks = defaultdict(int)
        for dat in dates:
            week = dat.isocalendar()[:2]
            weeks[week] += 1

        return sum(1 for count in weeks.values() if count >= repeat_target)

    def validate(self, attrs: object) -> object:
        user = self.context["request"].user
        activity = attrs.get("activity")

        current_objectives = Objective.objects.filter(user=user)
        if current_objectives.count() >= 3:
            raise serializers.ValidationError(
                {"activity": "Você só pode ter no máximo 3 objetivos ativos."}
            )
        if current_objectives.filter(activity=activity).exists():
            raise serializers.ValidationError(
                {"activity": "Você já possui um objetivo com essa atividade."}
            )
        return attrs

    def create(self, validated_data: object) -> object:
        return super().create(validated_data)
