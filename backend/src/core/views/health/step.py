from django.db.models.query import QuerySet
from django.utils import timezone
from rest_framework.exceptions import NotFound

from apps.health.models.steps import StepLog
from apps.health.serializers.steps import StepLogSerializer
from core.views.base import BaseView


class BaseStepsView(BaseView):
    serializer_class = StepLogSerializer

    def get_queryset(self) -> QuerySet[StepLog]:
        date_str = self.request.GET.get("date")
        queryset = StepLog.objects.filter(user=self.request.user)

        if date_str:
            try:
                date = timezone.datetime.strptime(date_str, "%Y-%m-%d").date()
                queryset = queryset.filter(date=date)
            except ValueError as e:
                message = "Formato de data inválido. Use YYYY-MM-DD."
                raise NotFound(message) from e

        if not queryset.exists():
            message = "Registros de passos não encontrados."
            raise NotFound(message)

        return queryset
