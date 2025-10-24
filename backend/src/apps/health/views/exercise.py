from django.db.models.query import QuerySet
from django.utils.dateparse import parse_date
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from apps.health.models.exercise import Exercise, ExerciseLog
from apps.health.serializers.exercise import (
    ExerciseLogSerializer,
    ExerciseSerializer,
)
from utils.check_achievement import check_foco_total


class BaseExerciseLogView(GenericAPIView):
    serializer_class = ExerciseLogSerializer

    def get_queryset(self) -> QuerySet[ExerciseLog]:
        queryset = ExerciseLog.objects.filter(user=self.request.user)
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")

        if start_date and (parsed := parse_date(start_date)):
            queryset = queryset.filter(datetime__date__gte=parsed)
        if end_date and (parsed := parse_date(end_date)):
            queryset = queryset.filter(datetime__date__lte=parsed)

        if not queryset.exists():
            message = "Registros de Exercícios não encontrados."
            raise NotFound(message)
        return queryset


class ExerciseListView(ListAPIView):
    serializer_class = ExerciseSerializer

    def get_queryset(self) -> QuerySet:
        queryset = Exercise.objects.all()
        if not queryset:
            message = "Exercícios não encontrados."
            raise NotFound(message)
        return queryset


class ExerciseLogView(BaseExerciseLogView, ListAPIView):
    pass


class ExerciseLogRegisterView(CreateAPIView):
    def perform_create(self, serializer: Serializer) -> None:
        serializer.save(user=self.request.user)

    def create(self, request: object, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        unlocked_achievements = check_foco_total(request.user)

        return Response(
            {
                "detail": "Registro de exercícios registrado com sucesso.",
                "unlocked_achievements": unlocked_achievements,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
