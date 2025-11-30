"""Views relacionadas aos registros de hidratação.

Este módulo define as views responsáveis por listar e registrar logs de hidratação
dos usuários. Após o registro, o sistema verifica se novas conquistas foram
desbloqueadas

Classes:
    HydratationLogListView: Lista os registros de hidratação do usuário autenticado.
    HydratationLogRegisterView: Cria novos registros e verifica conquistas associadas.
"""

from django.contrib.auth.models import AbstractBaseUser, AnonymousUser
from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from apps.health.serializers.hydration import HydrationGoalSerializer
from core.views.health.hydration import BaseHydrationView


class HydratationLogListView(BaseHydrationView, ListAPIView):
    pass


class HydratationLogRegisterView(BaseHydrationView, CreateAPIView):
    pass


class HydrationLogDeleteView(BaseHydrationView, DestroyAPIView):
    pass


class HydrationLogUpdateView(BaseHydrationView, UpdateAPIView):
    pass


class HydrationGoalView(RetrieveAPIView):
    serializer_class = HydrationGoalSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self) -> AbstractBaseUser | AnonymousUser:
        return self.request.user


class HydrationGoalUpdateView(UpdateAPIView):
    serializer_class = HydrationGoalSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self) -> AbstractBaseUser | AnonymousUser:
        return self.request.user
