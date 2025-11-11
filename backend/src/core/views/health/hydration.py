from django.db.models.query import QuerySet
from django.utils import timezone
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from apps.health.models.hydration import HydrationLog
from apps.health.serializers.hydration import HydrationLogSerializer
from core.views.base import BaseView


class BaseHydrationView(BaseView):
    serializer_class = HydrationLogSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    def get_queryset(self) -> QuerySet[HydrationLog]:
        date_str = self.request.GET.get("date")
        queryset = HydrationLog.objects.filter(user=self.request.user)

        if date_str:
            try:
                date = timezone.datetime.strptime(date_str, "%Y-%m-%d").date()
                queryset = queryset.filter(date=date)
            except ValueError as e:
                message = "Formato de data inválido. Use YYYY-MM-DD."
                raise NotFound(message) from e

        if not queryset.exists():
            message = "Registros de Hidratação não encontrados."
            raise NotFound(message)

        return queryset
