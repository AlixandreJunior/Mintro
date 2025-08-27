from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.health.models.steps import StepLog
from apps.health.serializers.steps import StepLogSerializer


class StepLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepLogSerializer

    def get_queryset(self):
        date_str = self.request.GET.get("date")
        queryset = StepLog.objects.filter(user=self.request.user)

        if date_str:
            try:
                date = timezone.datetime.strptime(date_str, "%Y-%m-%d").date()
                queryset = queryset.filter(date=date)
            except ValueError:
                raise NotFound("Formato de data inválido. Use YYYY-MM-DD.")

        if not queryset.exists():
            raise NotFound("Registros de passos não encontrados.")

        return queryset


class StepLogRegisterView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepLogSerializer

    def perform_create(self, serializer):
        steps = serializer.validated_data.get("steps", 0)
        calories = steps * 0.05
        serializer.save(
            user=self.request.user, date=timezone.now().date(), calories=calories
        )

    def create(self, request, *args, **kwargs):
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


class StepLogDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepLogSerializer
    lookup_field = "date"  # vamos usar a data como identificador

    def get_object(self):
        date_str = self.request.GET.get("date")
        if not date_str:
            raise NotFound("Informe a data no formato YYYY-MM-DD.")

        try:
            date = timezone.datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            raise NotFound("Formato de data inválido. Use YYYY-MM-DD.")

        try:
            step_log = StepLog.objects.get(user=self.request.user, date=date)
        except StepLog.DoesNotExist:
            raise NotFound(f"Registro de passos não encontrado para {date_str}.")

        return step_log
