"""URLs relacionadas às rotas de exercícios físicos.

Rotas disponíveis:
    - /list/ : Lista todos os exercícios disponíveis.
    - /log/list : Lista os registros de exercícios do usuário.
    - /log/register/ : Registra um novo exercício realizado.
"""

from django.urls import path

from apps.health.views.exercise import (
    ExerciseListView,
    ExerciseLogDeleteView,
    ExerciseLogRegisterView,
    ExerciseLogUpdateView,
    ExerciseLogView,
)

app_name = "exercise"

urlpatterns = [
    path("list/", ExerciseListView.as_view(), name="list"),
    path("log/list/", ExerciseLogView.as_view(), name="log_list"),
    path("log/register/", ExerciseLogRegisterView.as_view(), name="log_register"),
    path("log/delete/<int:id>/", ExerciseLogDeleteView.as_view(), name="log_delete"),
    path("log/update/<int:id>/", ExerciseLogUpdateView.as_view(), name="log_update"),
]
