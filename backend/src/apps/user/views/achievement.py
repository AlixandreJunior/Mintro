from rest_framework.generics import ListAPIView, RetrieveAPIView

from utils.base_views.user import BaseAchievementLogView, BaseAchievementView


class AchievementDetailView(BaseAchievementView, RetrieveAPIView):
    """
    RetrieveAPIView para retornar os detalhes de uma conquista específica (Achievement).

    Herda de:
        - BaseAchievementView: fornece configuração base de modelo e serializer.

    Uso:
        - Endpoint: /api/achievements/<id>/
        - Método: GET
        - Retorna: informações detalhadas de uma conquista específica.
    """

    pass


class AchievementLogDetailView(BaseAchievementLogView, RetrieveAPIView):
    """
    RetrieveAPIView para retornar os detalhes de um registro de conquista
    (AchievementLog).

    Herda de:
        - BaseAchievementLogView: define o modelo e serializer padrão de logs de
        conquistas.

    Uso:
        - Endpoint: /api/achievements/logs/<log_id>/
        - Método: GET
        - Retorna: informações detalhadas sobre um log de conquista do usuário
        autenticado.
    """

    pass


class AchievementListView(BaseAchievementView, ListAPIView):
    """
    ListAPIView para listar todas as conquistas disponíveis no sistema.

    Herda de:
        - BaseAchievementView: fornece o modelo e serializer de conquistas.

    Uso:
        - Endpoint: /api/achievements/
        - Método: GET
        - Retorna: uma lista de conquistas disponíveis, possivelmente com paginação.
    """

    pass


class AchievementLogListView(BaseAchievementLogView, ListAPIView):
    """
    ListAPIView para listar todos os registros de conquistas do usuário autenticado.

    Herda de:
        - BaseAchievementLogView: configura o modelo e queryset filtrado pelo usuário.

    Uso:
        - Endpoint: /api/achievements/logs/
        - Método: GET
        - Retorna: todos os logs de conquistas do usuário autenticado.
    """

    pass
