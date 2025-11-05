from typing import override

from django.db.models.query import QuerySet
from django.forms import ValidationError
from rest_framework import permissions
from rest_framework.exceptions import NotFound

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer, DiarySerializer
from apps.diary.serializers.objetives import ObjectiveSerializer
from utils.base_views.base import BaseView


class BaseActivityView(BaseView):
    model = Activity
    serializer_class = ActivitySerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Activity]:
        queryset = self.model.objects.all()
        if not queryset:
            msg = "Nenhuma atividade encontrada."
            raise NotFound(msg)
        return super().get_queryset()


class BaseDiaryView(BaseView):
    model = Diary
    serializer_class = DiarySerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Diary]:
        user = self.request.user
        search = self.request.query_params.get("search")
        month = self.request.query_params.get("month")
        year = self.request.query_params.get("year")

        queryset = (
            self.model.objects.filter(user=user)
            .select_related("user")
            .prefetch_related("activities")
            .order_by("-created_at")
        )

        if search:
            queryset = queryset.filter(title__icontains=search)

        try:
            if month:
                queryset = queryset.filter(created_at__month=int(month))
            if year:
                queryset = queryset.filter(created_at__year=int(year))

            if not queryset:
                msg = "Diários não encontrados."
                raise NotFound(msg)

        except ValueError as e:
            msg = "Os parâmetros de mês e ano devem ser números inteiros."

            raise ValidationError(msg) from e

        return queryset

    @override
    def get_object(self) -> Diary:
        diary_id = self.kwargs.get("id")
        obj = self.model.objects.get(id=diary_id, user=self.request.user)

        if self.model.DoesNotExist:
            msg = "Diário não encontrado."
            raise NotFound(msg)

        return obj


class BaseObjectiveView(BaseView):
    model = Objective
    serializer_class = ObjectiveSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Objective]:
        queryset = self.model.objects.filter(user=self.request.user)

        if not queryset:
            error_message = "Objetivos não encontrados."
            raise NotFound(error_message)
        return queryset

    @override
    def get_object(self) -> Objective:
        objective_id = self.kwargs.get("id")
        try:
            return self.model.objects.get(user=self.request.user, id=objective_id)
        except self.model.DoesNotExist as e:
            error_message = "Objetivo não encontrado."
            raise NotFound(error_message) from e
