"""URLs relacionadas às rotas de mindfulness.

Rotas disponíveis:
    - /list/ : Lista as práticas de mindfulness disponíveis.
    - /log/ : Lista os registros de práticas realizadas pelo usuário.
    - /log/register/ : Registra uma nova sessão de mindfulness.
"""

from django.urls import path

from apps.health.views.mindfulness import (
    MindfulnessListView,
    MindfulnessLogDeleteView,
    MindfulnessLogListView,
    MindfulnessLogRegisterView,
    MindfulnessLogUpdateView,
)

app_name = "mindfulness"

urlpatterns = [
    path("list/", MindfulnessListView.as_view(), name="list"),
    path("log/list/", MindfulnessLogListView.as_view(), name="log_list"),
    path("log/register/", MindfulnessLogRegisterView.as_view(), name="log_register"),
    path("log/delete/<int:id>/", MindfulnessLogDeleteView.as_view(), name="log_delete"),
    path("log/update/<int:id>/", MindfulnessLogUpdateView.as_view(), name="log_update"),
]
