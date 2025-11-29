"""URLs relacionadas às rotas de hidratação.

Rotas disponíveis:
    - /list/ : Lista os registros de hidratação do usuário.
    - /register/ : Registra uma nova entrada de hidratação.
"""

from django.urls import path

from apps.health.views.hydration import (
    HydratationLogListView,
    HydratationLogRegisterView,
    HydrationGoalUpdateView,
    HydrationGoalView,
    HydrationLogDeleteView,
    HydrationLogUpdateView,
)

app_name = "hydration"

urlpatterns = [
    path("list/", HydratationLogListView.as_view(), name="list"),
    path("register/", HydratationLogRegisterView.as_view(), name="register"),
    path("delete/<int:id>/", HydrationLogDeleteView.as_view(), name="delete"),
    path("update/<int:id>/", HydrationLogUpdateView.as_view(), name="update"),
    path("goal/", HydrationGoalView.as_view(), name="goal"),
    path("goal/update/", HydrationGoalUpdateView.as_view(), name="goal_update"),
]
