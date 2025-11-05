from django.urls import path

from apps.user.views.reminder import (
    ReminderCreateView,
    ReminderDeleteView,
    ReminderDetailView,
    ReminderListView,
    ReminderUpdateView,
)

app_name = "reminder"

#: Define as rotas de lembretes personalizados criados pelos usuários.
urlpatterns = [
    path("list/", ReminderListView.as_view(), name="list"),  # Listar lembretes
    path("create/", ReminderCreateView.as_view(), name="create"),  # Criar lembrete
    path(
        "detail/<int:pk>/", ReminderDetailView.as_view(), name="detail"
    ),  # Detalhar lembrete
    path(
        "update/<int:pk>/", ReminderUpdateView.as_view(), name="update"
    ),  # Atualizar lembrete
    path(
        "delete/<int:pk>/", ReminderDeleteView.as_view(), name="delete"
    ),  # Excluir lembrete
]
