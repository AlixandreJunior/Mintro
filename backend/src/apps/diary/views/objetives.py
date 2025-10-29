from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from utils.base_view import BaseObjectiveView


class ObjectiveListView(BaseObjectiveView, ListAPIView):
    pass


class ObjectiveDetailView(BaseObjectiveView, RetrieveAPIView):
    pass


class ObjectiveCreateView(BaseObjectiveView, CreateAPIView):
    success_message = "Objetivo criado com sucesso."


class ObjectiveUpdateView(BaseObjectiveView, UpdateAPIView):
    success_message = "Objetivo atualizado com sucesso."


class ObjectiveDeleteView(BaseObjectiveView, DestroyAPIView):
    success_message = "Objetivo excluído com sucesso."
