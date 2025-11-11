from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from core.views.diary.diary import BaseActivityView, BaseDiaryView


class ActivitiesListView(BaseActivityView, ListAPIView):
    """
    View para listagem de atividades.

    Herda de:
        - BaseActivityView: Define comportamentos e permissões específicas de
        atividades.
        - ListAPIView: Fornece o método GET padrão para listar objetos.
    """

    pass


class DiaryListView(BaseDiaryView, ListAPIView):
    """
    View para listagem de diários do usuário.

    Herda de:
        - BaseDiaryView: Define filtros, queryset e permissões específicos de diários.
        - ListAPIView: Implementa o método GET para listar instâncias.
    """

    pass


class DiaryObjectView(BaseDiaryView, RetrieveAPIView):
    """
    View para detalhar um diário específico.

    Herda de:
        - BaseDiaryView: Define o queryset e permissões.
        - RetrieveAPIView: Fornece o método GET para obter um único objeto.
    """

    pass


class DiaryDeleteView(BaseDiaryView, DestroyAPIView):
    """
    View para exclusão de um diário.

    Herda de:
        - BaseDiaryView: Define filtros e permissões.
        - DestroyAPIView: Implementa o método DELETE.
    """

    pass


class DiaryUpdateView(BaseDiaryView, UpdateAPIView):
    """
    View para atualização de um diário existente.

    Herda de:
        - BaseDiaryView: Define o queryset e validações.
        - UpdateAPIView: Implementa o método PUT/PATCH.
    """


class DiaryCreateView(BaseDiaryView, CreateAPIView):
    """
    View para criação de novos diários.

    Herda de:
        - BaseDiaryView: Define permissões e lógica de criação.
        - CreateAPIView: Fornece o método POST padrão.

    """

    pass
