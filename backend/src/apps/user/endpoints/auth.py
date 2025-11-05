from django.urls import path

from apps.user.views.auth import LoginView, LogoutView, RefreshView

app_name = "auth"

#: Rotas de autenticação com JWT.
urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),  # Login do usuário
    path("logout/", LogoutView.as_view(), name="logout"),  # Logout (invalida sessão)
    path("refresh/", RefreshView.as_view(), name="refresh"),  # Atualização de token JWT
]
