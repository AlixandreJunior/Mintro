from typing import override

from django.db.models.query import QuerySet
from django.utils.dateparse import parse_date
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from apps.health.models.hydration import HydrationLog
from apps.health.serializers.hydration import HydrationLogSerializer
from core.check_achievement import check_gole_a_gole
from core.views.base import BaseView


class BaseHydrationView(BaseView):
    model = HydrationLog
    serializer_class = HydrationLogSerializer
    update_message = "Hidratação atualizada com sucesso!"
    create_message = "Registro de hidratação criado com sucesso."
    achievement_check = staticmethod(check_gole_a_gole)

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    @override
    def get_queryset(self) -> QuerySet[HydrationLog]:
        queryset = self.model.objects.filter(user=self.request.user)
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")

        if start_date and (parsed := parse_date(start_date)):
            queryset = queryset.filter(date__gte=parsed)
        if end_date and (parsed := parse_date(end_date)):
            queryset = queryset.filter(date__lte=parsed)

        if not queryset.exists():
            message = "Registros de Hidratação não encontrados."
            raise NotFound(message)
        return queryset

    @override
    def get_object(self) -> HydrationLog:
        hydration_id = self.kwargs.get("id")

        try:
            return self.model.objects.get(id=hydration_id, user=self.request.user)
        except self.model.DoesNotExist as e:
            msg = "Registro não encontrado."
            raise NotFound(msg) from e
