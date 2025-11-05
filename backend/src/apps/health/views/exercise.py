"""Views relacionadas aos exercícios físicos.

Este módulo define as views responsáveis por listar exercícios disponíveis,
registrar logs de atividades físicas e retornar conquistas desbloqueadas
após um novo registro.

Classes:
    ExerciseListView: Exibe a lista de exercícios disponíveis.
    ExerciseLogView: Lista os registros de exercícios do usuário autenticado.
    ExerciseLogRegisterView: Cria um novo registro de exercício e verifica conquistas.
"""

from typing import TYPE_CHECKING, cast

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from utils.base_views.health import BaseExerciseLogView, BaseExerciseView
from utils.check_achievement import check_foco_total

if TYPE_CHECKING:
    from apps.user.models.user import User


class ExerciseListView(BaseExerciseView):
    """Exibe a lista de exercícios disponíveis no sistema.

    Esta view herda a lógica base de `BaseExerciseView`, que define o
    queryset e o serializer padrão para exibição dos exercícios.

    Methods:
        get_queryset(): Retorna a lista de exercícios.
    """

    pass


class ExerciseLogView(BaseExerciseLogView, ListAPIView):
    """Lista os registros de exercícios realizados pelo usuário.

    Esta view retorna todas as instâncias de `ExerciseLog` associadas
    ao usuário autenticado, herdando a lógica comum de `BaseExerciseLogView`.

    Methods:
        get_queryset(): Retorna os registros do usuário atual.
    """

    pass


class ExerciseLogRegisterView(BaseExerciseLogView, CreateAPIView):
    """Cria novos registros de exercícios e verifica conquistas desbloqueadas.

    Após criar o registro de exercício, esta view executa a função
    `check_foco_total()` para identificar se o usuário atingiu critérios
    de conquistas relacionados ao foco total.

    Methods:
        create(request, *args, **kwargs): Cria o registro e retorna conquistas.
    """

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        """Cria um novo log de exercício e verifica conquistas desbloqueadas.

        Args:
            request (Request): Objeto da requisição contendo os dados do exercício.
            *args (object): Argumentos adicionais passados à superclasse.
            **kwargs (object): Parâmetros de rota adicionais.

        Returns:
            Response: Resposta contendo uma mensagem de sucesso e,
                se aplicável, uma lista de conquistas desbloqueadas.
        """
        response = super().create(request, *args, **kwargs)
        user = cast("User", request.user)

        unlocked_achievements = check_foco_total(user)
        response.data = {
            "detail": "Registro de exercício criado com sucesso.",
            "unlocked_achievements": unlocked_achievements,
        }

        return response
