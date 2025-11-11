"""Views relacionadas aos exercícios físicos.

Este módulo define as views responsáveis por listar exercícios disponíveis,
registrar logs de atividades físicas e retornar conquistas desbloqueadas
após um novo registro.

Classes:
    ExerciseListView: Exibe a lista de exercícios disponíveis.
    ExerciseLogView: Lista os registros de exercícios do usuário autenticado.
    ExerciseLogRegisterView: Cria um novo registro de exercício e verifica conquistas.
"""

from rest_framework.generics import CreateAPIView, ListAPIView

from core.views.health.exercise import BaseExerciseLogView, BaseExerciseView


class ExerciseListView(BaseExerciseView, ListAPIView):
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
    """

    pass
