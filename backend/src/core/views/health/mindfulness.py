from typing import override

from django.db.models.query import QuerySet
from django.utils.dateparse import parse_date
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import BaseSerializer

from apps.health.models.mindfulness import Mindfulness, MindfulnessLog
from apps.health.serializers.mindfulness import (
    MindfulnessLogSerializer,
    MindfulnessSerializer,
)
from core.check_achievement import check_zen_total
from core.views.base import BaseView


class BaseMindfulnessView(BaseView):
    model = Mindfulness
    serializer_class = MindfulnessSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet[Mindfulness]:
        queryset = self.model.objects.all()

        if not queryset:
            message = "Exercícios de Mindfulness não encontrados."
            raise NotFound(message)
        return queryset


class BaseMindfulnessLogView(BaseView):
    model = MindfulnessLog
    serializer_class = MindfulnessLogSerializer
    permission_classes = (IsAuthenticated,)
    create_message = "Registro de Mindfulness criado com sucesso."
    update_message = "Registro de Mindfulness atualizado com sucesso."
    achievement_check = staticmethod(check_zen_total)

    @override
    def get_queryset(self) -> QuerySet[MindfulnessLog]:
        queryset = self.model.objects.filter(user=self.request.user)
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")

        if start_date and (parsed := parse_date(start_date)):
            queryset = queryset.filter(datetime__date__gte=parsed)
        if end_date and (parsed := parse_date(end_date)):
            queryset = queryset.filter(datetime__date__lte=parsed)

        if not queryset.exists():
            message = "Registros de mindfulness não encontrados."
            raise NotFound(message)
        return queryset

    @override
    def get_object(self) -> MindfulnessLog:
        mindfulness_log_id = self.kwargs.get("id")

        try:
            return self.model.objects.get(id=mindfulness_log_id, user=self.request.user)
        except self.model.DoesNotExist as e:
            msg = "Registro não encontrado."
            raise NotFound(msg) from e

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)
