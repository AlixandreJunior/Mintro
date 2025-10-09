from django.db.models.query import QuerySet
from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from apps.health.models.steps import StepLog
from apps.health.serializers.steps import StepLogSerializer
from utils.base_view import BaseView


class BaseStepsView(BaseView):
    serializer_class = StepLogSerializer

    def get_queryset(self) -> QuerySet:
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


class StepLogListView(BaseStepsView, ListAPIView):
    pass


class StepLogRegisterView(CreateAPIView):
    def perform_create(self, serializer: Serializer) -> None:
        serializer.save(user=self.request.user, date=timezone.now().date())

    def create(self, request: object, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(
            {
                "detail": "Registro de passos registrado com sucesso.",
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
