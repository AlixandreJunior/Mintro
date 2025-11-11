from datetime import date, datetime

from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer
from utils.get_functions import (
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
    """Serializer base para o modelo ``Objective``.

    Utilizado para criação e listagem de objetivos, incluindo apenas os
    campos diretos do modelo e uma validação para limitar a quantidade
    de objetivos por atividade.

    Attributes:
        activity (ActivitySerializer): Representação detalhada da atividade
        (somente leitura).
        activities (PrimaryKeyRelatedField): Campo de escrita que referencia uma
        atividade existente.
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
        """Valida o número máximo de objetivos para uma atividade.

        Args:
            value (Activity): Atividade selecionada.

        Returns:
            Activity: A própria atividade validada.

        Raises:
            ValidationError: Se o usuário já atingiu o limite permitido
                de objetivos para a atividade especificada.
        """
        user = self.context["request"].user

        if value:
            current_objectives = Objective.objects.filter(user=user)
            validate_objective_limits(current_objectives, value, 3)

        return value


# ==========================================================
# DETAIL SERIALIZER — USADO SOMENTE PARA DETALHES
# ==========================================================


class ObjectiveDetailSerializer(ObjectiveSerializer):
    """Serializer detalhado para o modelo ``Objective``.

    Estende o ``ObjectiveSerializer`` e adiciona campos calculados
    com base nos registros do diário do usuário.

    Usado exclusivamente na rota de detalhe de um objetivo.
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
        read_only_fields = fields  # todos os calculados são somente leitura

    # ---------- MÉTODOS DE CÁLCULO ----------

    def get_diary_dates(self, obj: "Objective") -> list[date]:
        """Obtém e cacheia as datas dos diários relacionados à atividade.

        Args:
            obj (Objective): Instância do objetivo.

        Returns:
            list[date]: Lista ordenada de datas em que o diário foi preenchido.
        """
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
        """Conta quantos registros do diário ocorreram na semana atual."""
        dates = self.get_diary_dates(obj)
        current_week = datetime.now().isocalendar()[1]
        return sum(1 for d in dates if d.isocalendar()[1] == current_week)

    def get_days_with(self, obj: "Objective") -> int:
        """Retorna o total de dias em que o diário foi preenchido."""
        return len(self.get_diary_dates(obj))

    def get_streak(self, obj: "Objective") -> int:
        """Calcula a sequência atual de dias consecutivos de conclusão."""
        return streak(self.get_diary_dates(obj))

    def get_best_streak(self, obj: "Objective") -> int:
        """Retorna a melhor sequência de dias consecutivos."""
        return best_streak(self.get_diary_dates(obj))

    def get_success_rate_average(self, obj: "Objective") -> float:
        """Calcula a taxa média de sucesso do objetivo."""
        return success_rate_average(obj)

    def get_conclusion_count(self, obj: "Objective") -> int:
        """Conta o número total de conclusões do objetivo."""
        dates = self.get_diary_dates(obj)
        return conclusion_count(obj, dates)
