from django.db.models.query import QuerySet
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from apps.diary.models.objetives import Objective
from apps.diary.serializers.objetives import (
    ObjectiveSerializer,
)
from utils.base_view import BaseView


class BaseObjectiveView(BaseView):
    serializer_class = ObjectiveSerializer

    def get_queryset(self) -> QuerySet:
        queryset = Objective.objects.filter(user=self.request.user)

        if not queryset:
            error_message = "Objetivos não encontrados."
            raise NotFound(error_message)
        return queryset

    def get_object(self) -> Objective:
        objective_id = self.kwargs.get("id")
        try:
            return Objective.objects.get(user=self.request.user, id=objective_id)
        except Objective.DoesNotExist as e:
            error_message = "Objetivo não encontrado."
            raise NotFound(error_message) from e


class ObjectiveListView(BaseObjectiveView, ListAPIView):
    pass


class ObjectiveCreateView(BaseObjectiveView, CreateAPIView):
    def create(self, request: object, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"detail": "Objetivo criado com sucesso."}, status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer: Serializer) -> None:
        serializer.save(user=self.request.user)


class ObjectiveDetailView(BaseObjectiveView, RetrieveAPIView):
    pass


class ObjectiveUpdateView(BaseObjectiveView, UpdateAPIView):
    pass


class ObjectiveDeleteView(BaseObjectiveView, DestroyAPIView):
    pass
