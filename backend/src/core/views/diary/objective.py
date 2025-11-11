from typing import override

from django.db.models.query import QuerySet
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from apps.diary.models.objetives import Objective
from apps.diary.serializers.objetives import ObjectiveSerializer
from core.views.base import BaseView


class BaseObjectiveView(BaseView):
    model = Objective
    serializer_class = ObjectiveSerializer
    permission_classes = (permissions.IsAuthenticated,)
    create_message = "Objetivo criado com sucesso."
    update_message = "Objetivo atualizado com sucesso."

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

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)
