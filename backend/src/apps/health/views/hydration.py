"""Views relacionadas aos registros de hidratação.

Este módulo define as views responsáveis por listar e registrar logs de hidratação
dos usuários. Após o registro, o sistema verifica se novas conquistas foram
desbloqueadas

Classes:
    HydratationLogListView: Lista os registros de hidratação do usuário autenticado.
    HydratationLogRegisterView: Cria novos registros e verifica conquistas associadas.
"""

from typing import TYPE_CHECKING, cast

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from core.views.health.hydration import BaseHydrationView
from core.check_achievement import check_gole_a_gole

if TYPE_CHECKING:
    from apps.user.models.user import User


class HydratationLogListView(BaseHydrationView, ListAPIView):
    """Lista os registros de hidratação do usuário autenticado.

    Esta view retorna todos os registros (`HydrationLog`) associados
    ao usuário logado, herdando a lógica base de `BaseHydrationView`.

    Methods:
        get_queryset(): Retorna os registros de hidratação do usuário atual.
    """

    pass


class HydratationLogRegisterView(BaseHydrationView, CreateAPIView):
    """Cria novos registros de hidratação e verifica conquistas desbloqueadas.

    Após a criação de um novo registro, esta view executa a função
    `check_gole_a_gole()` para verificar se o usuário atingiu critérios
    que concedem conquistas relacionadas à hidratação consistente.

    Methods:
        create(request, *args, **kwargs): Cria o registro e retorna conquistas
        desbloqueadas.
    """

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        """Cria um novo log de hidratação e verifica conquistas desbloqueadas.

        Args:
            request (Request): Objeto da requisição contendo os dados do registro.
            *args (object): Argumentos adicionais passados à superclasse.
            **kwargs (object): Parâmetros de rota adicionais.

        Returns:
            Response: Resposta contendo uma mensagem de sucesso e,
                se aplicável, uma lista de conquistas desbloqueadas.
        """
        response = super().create(request, *args, **kwargs)
        user = cast("User", request.user)

        unlocked_achievements = check_gole_a_gole(user)
        response.data = {
            "detail": "Registro de hidratação criado com sucesso.",
            "unlocked_achievements": unlocked_achievements,
        }

        return response
