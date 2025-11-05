"""URLs relacionadas às rotas de mindfulness.

Rotas disponíveis:
    - /list/ : Lista as práticas de mindfulness disponíveis.
    - /log/ : Lista os registros de práticas realizadas pelo usuário.
    - /log/register/ : Registra uma nova sessão de mindfulness.
"""

from django.urls import path

from apps.health.views.mindfulness import (
    MindfulnessListView,
    MindfulnessLogListView,
    MindfulnessLogRegisterView,
)

app_name = "mindfulness"

urlpatterns = [
    path("list/", MindfulnessListView.as_view(), name="list"),
    path("log/", MindfulnessLogListView.as_view(), name="log_list"),
    path("log/register/", MindfulnessLogRegisterView.as_view(), name="log_register"),
]
