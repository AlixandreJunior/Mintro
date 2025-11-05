"""URLs relacionadas às rotas de passos diários.

Rotas disponíveis:
    - /list/ : Lista os registros de passos do usuário.
    - /register/ : Registra um novo total de passos.
"""

from django.urls import path

from apps.health.views.steps import StepLogListView, StepLogRegisterView

app_name = "steps"

urlpatterns = [
    path("list/", StepLogListView.as_view(), name="list"),
    path("register/", StepLogRegisterView.as_view(), name="register"),
]
