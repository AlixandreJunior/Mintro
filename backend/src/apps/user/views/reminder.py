from rest_framework import generics

from core.views.user.reminder import BaseReminderView


class ReminderListView(BaseReminderView, generics.ListAPIView):
    """
    ListAPIView para listar todos os lembretes (Reminders) do usuário autenticado.

    Herda de:
        - BaseReminderView: fornece modelo, serializer e filtro por usuário.

    Uso:
        - Endpoint: /api/reminders/
        - Método: GET
        - Retorna: uma lista de lembretes do usuário autenticado, ordenados por data e
        hora.
    """

    pass


class ReminderCreateView(BaseReminderView, generics.CreateAPIView):
    """
    CreateAPIView para criar um novo lembrete (Reminder).
    """

    pass


class ReminderDetailView(BaseReminderView, generics.RetrieveAPIView):
    """
    RetrieveAPIView para exibir os detalhes de um lembrete específico.

    Herda de:
        - BaseReminderView: fornece configuração de modelo e serializer.

    Uso:
        - Endpoint: /api/reminders/<id>/
        - Método: GET
        - Retorna: informações detalhadas de um lembrete específico.
    """

    pass


class ReminderUpdateView(BaseReminderView, generics.UpdateAPIView):
    """
    UpdateAPIView para atualizar as informações de um lembrete existente.

    Herda de:
        - BaseReminderView: fornece modelo, serializer e controle de permissões.

    Uso:
        - Endpoint: /api/reminders/<id>/
        - Método: PUT ou PATCH
        - Corpo esperado: campos a serem atualizados.
        - Retorna: Uma mensagem de Sucesso
    """

    pass


class ReminderDeleteView(BaseReminderView, generics.DestroyAPIView):
    """
    DestroyAPIView para excluir um lembrete existente.

    Herda de:
        - BaseReminderView: define modelo, serializer e permissões de usuário
        autenticado.

    Uso:
        - Endpoint: /api/reminders/<id>/
        - Método: DELETE
    """

    pass
