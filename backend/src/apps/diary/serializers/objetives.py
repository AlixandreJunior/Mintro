from datetime import date, datetime

from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer
from utils.calculate import (
    best_streak,
    conclusion_count,
    streak,
    success_rate_average,
)
from utils.validate import validate_objective_limits

# ==========================================================
# SERIALIZERS BASEADOS EM CONTEXTO
# ==========================================================


class ObjectiveSerializer(serializers.ModelSerializer):
    """
    Serializer base — usado para criação e listagem.
    Inclui apenas os campos diretos do modelo.
    """

    activity = ActivitySerializer(read_only=True)
    activities = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(), source="activity", write_only=True
    )

    class Meta:  # type: ignore
        model = Objective
        fields = ("id", "user", "activity", "activities", "repeat", "created_at")
        read_only_fields = ("id", "user", "activity", "created_at")

    def validate_activities(self, value: Activity) -> Activity:
        user = self.context["request"].user

        if value:
            current_objectives = Objective.objects.filter(user=user)
            validate_objective_limits(current_objectives, value, 3)

        return value


# ==========================================================
# DETAIL SERIALIZER — USADO SOMENTE PARA DETALHES
# ==========================================================


class ObjectiveDetailSerializer(ObjectiveSerializer):
    """
    Serializer detalhado — inclui métricas e cálculos.
    Usado apenas na rota de detail.
    """

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
            *ObjectiveSerializer.Meta.fields,
            "week_count",
            "days_with",
            "streak",
            "best_streak",
            "success_rate_average",
            "conclusion_count",
            "diary_dates",
        )
        read_only_fields = fields  # todos os calculados são read-only

    # ---------- MÉTODOS DE CÁLCULO ----------

    def get_diary_dates(self, obj: "Objective") -> list[date]:
        cached_dates = getattr(obj, "__cached_diary_dates", None)
        if cached_dates is None:
            diary_datetimes = Diary.objects.filter(
                user=obj.user,
                activities=obj.activity,
                created_at__gte=obj.created_at,
            ).values_list("created_at", flat=True)
            cached_dates = sorted(dt.date() for dt in diary_datetimes)
            setattr(obj, "__cached_diary_dates", cached_dates)
        return cached_dates

    def get_week_count(self, obj: "Objective") -> int:
        dates = self.get_diary_dates(obj)
        current_week = datetime.now().isocalendar()[1]
        return sum(1 for d in dates if d.isocalendar()[1] == current_week)

    def get_days_with(self, obj: "Objective") -> int:
        return len(self.get_diary_dates(obj))

    def get_streak(self, obj: "Objective") -> int:
        return streak(self.get_diary_dates(obj))

    def get_best_streak(self, obj: "Objective") -> int:
        return best_streak(self.get_diary_dates(obj))

    def get_success_rate_average(self, obj: "Objective") -> float:
        return success_rate_average(obj)

    def get_conclusion_count(self, obj: "Objective") -> int:
        dates = self.get_diary_dates(obj)
        return conclusion_count(obj, dates)
