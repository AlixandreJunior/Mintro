from django.db.models.query import QuerySet
from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from apps.health.models.hydratation import HydrationLog
from apps.health.serializers.hydratation import HydrationLogSerializer
from utils.base_view import BaseView
from utils.check_achievement import check_gole_a_gole


class BaseHydrationView(BaseView):
    serializer_class = HydrationLogSerializer

    def get_queryset(self) -> QuerySet:
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


class HydratationLogListView(BaseHydrationView, ListAPIView):
    pass


class HydratationLogRegisterView(BaseHydrationView, CreateAPIView):
    def perform_create(self, serializer: Serializer) -> None:
        serializer.save(user=self.request.user)

    def create(self, request: object, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        unlocked_achievements = check_gole_a_gole(request.user)

        return Response(
            {
                "detail": "Registro de Hidratação registrado com sucesso.",
                "unlocked_achievements": unlocked_achievements,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
