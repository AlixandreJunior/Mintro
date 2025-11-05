from typing import override

from django.db.models.query import QuerySet
from django.utils import timezone
from django.utils.dateparse import parse_date
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

from apps.health.models.exercise import Exercise, ExerciseLog
from apps.health.models.hydration import HydrationLog
from apps.health.models.mindfulness import Mindfulness, MindfulnessLog
from apps.health.models.steps import StepLog
from apps.health.serializers.exercise import ExerciseLogSerializer, ExerciseSerializer
from apps.health.serializers.hydration import HydrationLogSerializer
from apps.health.serializers.mindfulness import (
    MindfulnessLogSerializer,
    MindfulnessSerializer,
)
from apps.health.serializers.steps import StepLogSerializer
from utils.base_views.base import BaseView


class BaseExerciseView(BaseView):
    model = Exercise
    serializer_class = ExerciseSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self) -> QuerySet[Exercise]:
        queryset = self.model.objects.all()

        if not queryset:
            message = "Exercícios não encontrados."
            raise NotFound(message)
        return queryset


class BaseExerciseLogView(BaseView):
    model = ExerciseLog
    permission_classes = (IsAuthenticated,)
    serializer_class = ExerciseLogSerializer

    @override
    def get_queryset(self) -> QuerySet[ExerciseLog]:
        queryset = self.model.objects.filter(user=self.request.user)
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
            message = "Registros de Exercícios não encontrados."
            raise NotFound(message)
        return queryset


class BaseHydrationView(BaseView):
    serializer_class = HydrationLogSerializer

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
