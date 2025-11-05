"""URLs relacionadas às rotas de hidratação.

Rotas disponíveis:
    - /list/ : Lista os registros de hidratação do usuário.
    - /register/ : Registra uma nova entrada de hidratação.
"""

from django.urls import path

from apps.health.views.hydration import (
    HydratationLogListView,
    HydratationLogRegisterView,
)

app_name = "hydration"

urlpatterns = [
    path("list/", HydratationLogListView.as_view(), name="list"),
    path("register/", HydratationLogRegisterView.as_view(), name="register"),
]
