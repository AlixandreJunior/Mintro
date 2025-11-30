"""Módulo principal de roteamento do aplicativo Health.

Inclui e organiza as rotas dos submódulos de saúde:
- Hidratação
- Passos
- Exercícios
- Mindfulness
"""

from django.urls import URLPattern, URLResolver, include, path

app_name = "health"

urlpatterns: list[URLPattern | URLResolver] = [
    path("hydration/", include("apps.health.endpoints.hydration")),
    path("step/", include("apps.health.endpoints.steps")),
    path("exercise/", include("apps.health.endpoints.exercise")),
    path("mindfulness/", include("apps.health.endpoints.mindfulness")),
]
