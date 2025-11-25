from typing import override

from django.db.models.query import QuerySet
from django.utils.dateparse import parse_date
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import BaseSerializer

from apps.health.models.exercise import Exercise, ExerciseLog
from apps.health.serializers.exercise import ExerciseLogSerializer, ExerciseSerializer
from core.check_achievement import check_foco_total
from core.views.base import BaseView


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
    update_message = "Registro Atualizado com sucesso!!"
    create_message = "Registro Criado com sucesso."
    achivement_check = staticmethod(check_foco_total)

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

    @override
    def get_object(self) -> ExerciseLog:
        exercise_log_id = self.kwargs.get("id")

        try:
            return self.model.objects.get(id=exercise_log_id, user=self.request.user)
        except self.model.DoesNotExist as e:
            msg = "Registro não encontrado."
            raise NotFound(msg) from e

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)
