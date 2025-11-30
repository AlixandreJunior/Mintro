from django.urls import URLPattern, URLResolver, include, path

app_name = "user"

#: Agrupa todos os submódulos de rotas relacionadas ao app de usuários.
#: Inclui autenticação, lembretes, conquistas e dados do próprio usuário.
urlpatterns: list[URLPattern | URLResolver] = [
    path("", include("apps.user.endpoints.user")),  # Rotas de perfil de usuário
    path("auth/", include("apps.user.endpoints.auth")),  # Login, logout, refresh
    path("reminder/", include("apps.user.endpoints.reminder")),  # Lembretes
    path("achievements/", include("apps.user.endpoints.achievements")),  # Conquistas
]
