from typing import TYPE_CHECKING, cast

from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.request import Request
from rest_framework.response import Response

from utils.base_views.diary import BaseActivityView, BaseDiaryView
from utils.check_achievement import check_narrador_da_propria_historia

if TYPE_CHECKING:
    from apps.user.models.user import User


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

    success_message = "Diário atualizado com sucesso."


class DiaryCreateView(BaseDiaryView, CreateAPIView):
    """
    View para criação de novos diários.

    Herda de:
        - BaseDiaryView: Define permissões e lógica de criação.
        - CreateAPIView: Fornece o método POST padrão.

    Sobrescreve:
        - create(): adiciona lógica personalizada de conquistas desbloqueadas após a
        criação do diário.
    """

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        """
        Cria um novo diário e verifica conquistas desbloqueadas.

        Args:
            request (Request): Objeto de requisição contendo dados do diário.
            *args (object): Argumentos posicionais adicionais.
            **kwargs (object): Argumentos nomeados adicionais.

        Returns:
            Response: Resposta contendo mensagem de sucesso e conquistas desbloqueadas.
        """
        response = super().create(request, *args, **kwargs)
        user = cast("User", request.user)

        unlocked_achievements = check_narrador_da_propria_historia(user)

        response.data = {
            "detail": "Diário criado com sucesso.",
            "unlocked_achievements": unlocked_achievements,
        }

        return response
