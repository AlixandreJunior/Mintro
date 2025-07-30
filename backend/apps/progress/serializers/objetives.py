from datetime import timedelta

from apps.mental_health.models.diary import Activity, Diary
from apps.mental_health.serializers.diary import ActivitySerializer
from apps.progress.models.objetives import Objective
from django.utils import timezone
from rest_framework import serializers


class ObjectiveReadSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    best_streak = serializers.SerializerMethodField()
    week_count = serializers.SerializerMethodField()
    days_with = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()
    conclusion_count = serializers.SerializerMethodField()
    success_rate_average = serializers.SerializerMethodField()  # novo campo
    diary_dates = serializers.SerializerMethodField()

    class Meta:
        model = Objective
        fields = [
            "id",
            "user",
            "activity",
            "period",
            "repeat",
            "reminder",
            "created_at",
            "week_count",
            "days_with",
            "streak",
            "best_streak",
            "success_rate_average",
            "conclusion_count",
            "diary_dates",
        ]

    def get_diary_dates(self, obj):
        diaries = Diary.objects.filter(
            user=obj.user, activities=obj.activity, datetime__gte=obj.created_at
        ).order_by("datetime")

        return sorted(set([d.datetime.date() for d in diaries]))

    def get_success_rate_average(self, obj):
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
            week_key = date.isocalendar()[:2]  # (ano, semana)
            weeks[week_key] += 1

        if not weeks:
            return 0.0

        weekly_rates = []
        for count in weeks.values():
            rate = min(count / repeat_target, 1.0)  # máximo 100%
            weekly_rates.append(rate)

        average_rate = sum(weekly_rates) / len(weekly_rates)

        return round(average_rate * 100, 2)

    def get_best_streak(self, obj):
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

    def get_streak(self, obj):
        dates = self.get_diary_dates(obj)
        if not dates:
            return 0

        streak = 1
        for i in range(len(dates) - 1, 0, -1):
            if dates[i] == dates[i - 1] + timedelta(days=1):
                streak += 1
            elif dates[i] != dates[i - 1]:
                break
        # Se o último registro não for de ontem ou hoje, não conta como streak ativa
        if dates[-1] < timezone.now().date() - timedelta(days=1):
            return 0
        return streak

    def get_week_count(self, obj):
        now = timezone.now().date()
        dates = self.get_diary_dates(obj)
        current_week_dates = [
            d for d in dates if d.isocalendar()[1] == now.isocalendar()[1]
        ]
        return len(current_week_dates)

    def get_days_with(self, obj):
        dates = self.get_diary_dates(obj)
        return len(dates)

    def get_conclusion_count(self, obj):
        from collections import defaultdict

        dates = self.get_diary_dates(obj)
        if not dates:
            return 0

        try:
            repeat_target = int(obj.repeat)
        except (ValueError, TypeError):
            # Valor inválido, considerar zero para não contar
            repeat_target = 0

        weeks = defaultdict(int)
        for date in dates:
            week = date.isocalendar()[:2]  # (ano, semana)
            weeks[week] += 1

        return sum(1 for count in weeks.values() if count >= repeat_target)


class ObjectiveWriteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    activity = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all())

    class Meta:
        model = Objective
        fields = [
            "id",
            "user",
            "activity",
            "period",
            "repeat",
            "reminder",
            "created_at",
        ]
        read_only_fields = ["created_at"]

    def validate(self, attrs):
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

    def create(self, validated_data):
        return super().create(validated_data)
