"""URLs relacionadas às rotas de passos diários.

Rotas disponíveis:
    - /list/ : Lista os registros de passos do usuário.
    - /register/ : Registra um novo total de passos.
"""

from django.urls import path

from apps.health.views.steps import (
    StepGoalUpdateView,
    StepGoalView,
    StepLogListView,
    StepLogRegisterView,
)

app_name = "steps"

urlpatterns = [
    path("list/", StepLogListView.as_view(), name="list"),
    path("register/", StepLogRegisterView.as_view(), name="register"),
    path("goal/", StepGoalView.as_view(), name="goal"),
    path("goal/update/", StepGoalUpdateView.as_view(), name="goal"),
]
