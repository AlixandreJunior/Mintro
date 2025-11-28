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

from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
)

from core.views.health.mindfulness import BaseMindfulnessLogView, BaseMindfulnessView


class MindfulnessListView(BaseMindfulnessView, ListAPIView):
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

    pass


class MindfulnessLogDeleteView(BaseMindfulnessLogView, DestroyAPIView):
    """Cria novos registros de exercícios e verifica conquistas desbloqueadas.

    Após criar o registro de exercício, esta view executa a função
    `check_foco_total()` para identificar se o usuário atingiu critérios
    de conquistas relacionados ao foco total.
    """

    pass


class MindfulnessLogUpdateView(BaseMindfulnessLogView, UpdateAPIView):
    """Cria novos registros de exercícios e verifica conquistas desbloqueadas.

    Após criar o registro de exercício, esta view executa a função
    `check_foco_total()` para identificar se o usuário atingiu critérios
    de conquistas relacionados ao foco total.
    """

    pass
