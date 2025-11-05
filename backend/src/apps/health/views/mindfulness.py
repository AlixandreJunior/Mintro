"""Views relacionadas às práticas de Mindfulness.

Este módulo define as views responsáveis por listar e registrar logs de Mindfulness
(realizações de práticas meditativas, respiração consciente, etc.) associadas aos
usuários.
Após o registro de uma nova prática, o sistema verifica se novas conquistas foram
desbloqueadas.

Classes:
    MindfulnessListView: Lista todas as práticas de Mindfulness disponíveis.
    MindfulnessLogListView: Lista os registros de Mindfulness do usuário autenticado.
    MindfulnessLogRegisterView: Cria novos registros e verifica conquistas associadas.
"""

from typing import TYPE_CHECKING, cast

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from utils.base_views.health import BaseMindfulnessLogView
from utils.check_achievement import check_zen_total

if TYPE_CHECKING:
    from apps.user.models.user import User


class MindfulnessListView(BaseMindfulnessLogView, ListAPIView):
    """Lista todas as práticas de Mindfulness disponíveis.

    Esta view retorna as opções de práticas de Mindfulness cadastradas no sistema,
    permitindo que o usuário visualize as modalidades disponíveis.

    Methods:
        get_queryset(): Retorna todas as práticas cadastradas.
    """

    pass


class MindfulnessLogListView(BaseMindfulnessLogView, ListAPIView):
    """Lista os registros de Mindfulness do usuário autenticado.

    Esta view exibe todos os registros (`MindfulnessLog`) associados
    ao usuário logado, permitindo acompanhar o histórico de práticas realizadas.

    Methods:
        get_queryset(): Retorna os registros de Mindfulness do usuário atual.
    """

    pass


class MindfulnessLogRegisterView(BaseMindfulnessLogView, CreateAPIView):
    """Cria novos registros de Mindfulness e verifica conquistas desbloqueadas.

    Após o registro de uma nova prática, esta view executa a função
    `check_zen_total()` para verificar se o usuário atingiu condições
    que concedem conquistas relacionadas à constância em práticas de Mindfulness.

    Methods:
        create(request, *args, **kwargs): Cria o registro e retorna conquistas
        desbloqueadas.
    """

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        """Cria um novo registro de Mindfulness e verifica conquistas desbloqueadas.

        Args:
            request (Request): Objeto da requisição contendo os dados da prática
            registrada.
            *args (object): Argumentos adicionais passados à superclasse.
            **kwargs (object): Parâmetros adicionais de rota.

        Returns:
            Response: Resposta com uma mensagem de sucesso e, se aplicável,
                uma lista de conquistas desbloqueadas.
        """
        response = super().create(request, *args, **kwargs)
        user = cast("User", request.user)

        unlocked_achievements = check_zen_total(user)
        response.data = {
            "detail": "Registro de Mindfulness criado com sucesso.",
            "unlocked_achievements": unlocked_achievements,
        }

        return response
