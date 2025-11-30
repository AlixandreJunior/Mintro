from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)

from apps.diary.serializers.objetives import ObjectiveDetailSerializer
from core.views.diary.objective import BaseObjectiveView


class ObjectiveListView(BaseObjectiveView, ListAPIView):
    """
    View para listagem de objetivos do usuário.

    Herda de:
        - BaseObjectiveView: Define o queryset, permissões e comportamento padrão para
        objetivos.
        - ListAPIView: Fornece o método GET para listar instâncias do modelo.
    """

    pass


class ObjectiveDetailView(BaseObjectiveView, RetrieveAPIView):
    """
    View para detalhamento de um objetivo específico.

    Herda de:
        - BaseObjectiveView: Configurações e validações comuns a todas as views de
        objetivos.
        - RetrieveAPIView: Fornece o método GET para recuperar uma única instância.

    Atributos:
        serializer_class (ObjectiveDetailSerializer): Serializer detalhado com métricas
        e cálculos adicionais.
    """

    serializer_class = ObjectiveDetailSerializer
    pass


class ObjectiveCreateView(BaseObjectiveView, CreateAPIView):
    """
    View para criação de novos objetivos.

    Herda de:
        - BaseObjectiveView: Fornece o queryset e permissões básicas.
        - CreateAPIView: Implementa o método POST para criação de registros.

    Atributos:
        success_message (str): Mensagem exibida após criação bem-sucedida.
    """

    success_message = "Objetivo criado com sucesso."


class ObjectiveUpdateView(BaseObjectiveView, UpdateAPIView):
    """
    View para atualização de um objetivo existente.

    Herda de:
        - BaseObjectiveView: Define configurações e permissões padrão.
        - UpdateAPIView: Fornece os métodos PUT e PATCH para atualização de dados.

    Atributos:
        success_message (str): Mensagem exibida após atualização bem-sucedida.
    """

    success_message = "Objetivo atualizado com sucesso."


class ObjectiveDeleteView(BaseObjectiveView, DestroyAPIView):
    """
    View para exclusão de um objetivo.

    Herda de:
        - BaseObjectiveView: Define permissões e queryset padrão.
        - DestroyAPIView: Fornece o método DELETE para remover instâncias do banco de
        dados.
    """

    pass
