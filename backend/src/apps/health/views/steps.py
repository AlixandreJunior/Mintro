from django.contrib.auth.models import AbstractBaseUser, AnonymousUser
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.health.serializers.steps import StepGoalSerializer
from core.views.health.step import BaseStepsView


class StepLogListView(BaseStepsView, ListAPIView):
    """Endpoint para listar os registros de passos do usuário.

    Herda de:
        BaseStepsView: Classe base que define lógica e configurações comuns
            para visualizações relacionadas a registros de passos.
        ListAPIView: Fornece funcionalidade padrão de listagem no DRF.
    """

    pass


class StepLogRegisterView(BaseStepsView, CreateAPIView):
    """Endpoint para registrar novos logs de passos do usuário.

    Métodos:
        create(request, *args, **kwargs):
            Cria um novo registro de passos e retorna uma mensagem de sucesso.
    """

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        """Cria um novo registro de passos.

        Args:
            request (Request): Objeto de requisição contendo os dados do novo registro.
            *args (object): Argumentos posicionais adicionais.
            **kwargs (object): Argumentos nomeados adicionais.

        Returns:
            Response: Resposta contendo mensagem de sucesso.
        """
        response = super().create(request, *args, **kwargs)
        response.data = {
            "detail": "Registro de passos criado com sucesso.",
        }
        return response


class StepGoalView(RetrieveAPIView):
    serializer_class = StepGoalSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self) -> AbstractBaseUser | AnonymousUser:
        return self.request.user
