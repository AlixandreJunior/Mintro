from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer

from utils.base_view import BaseObjectiveView


class ObjectiveListView(BaseObjectiveView, ListAPIView):
    pass


class ObjectiveCreateView(BaseObjectiveView, CreateAPIView):
    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"detail": "Objetivo criado com sucesso."}, status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class ObjectiveDetailView(BaseObjectiveView, RetrieveAPIView):
    pass


class ObjectiveUpdateView(BaseObjectiveView, UpdateAPIView):
    pass


class ObjectiveDeleteView(BaseObjectiveView, DestroyAPIView):
    pass
