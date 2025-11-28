from typing import override

from django.db.models.query import QuerySet
from django.utils.dateparse import parse_date
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from apps.health.models.steps import StepLog
from apps.health.serializers.steps import StepLogSerializer
from core.views.base import BaseView


class BaseStepsView(BaseView):
    model = StepLog
    serializer_class = StepLogSerializer
    create_message = "Registro criado com sucesso."

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    @override
    def get_queryset(self) -> QuerySet[StepLog]:
        queryset = self.model.objects.filter(user=self.request.user)
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")

        if start_date and (parsed := parse_date(start_date)):
            queryset = queryset.filter(date__gte=parsed)
        if end_date and (parsed := parse_date(end_date)):
            queryset = queryset.filter(date__lte=parsed)

        if not queryset.exists():
            message = "Registros de passos não encontrados."
            raise NotFound(message)
        return queryset
