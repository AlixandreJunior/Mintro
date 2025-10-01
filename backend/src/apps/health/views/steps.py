from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import CreateAPIView, ListAPIView
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
        serializer.save(user=self.request.user, date=timezone.now().date())

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
