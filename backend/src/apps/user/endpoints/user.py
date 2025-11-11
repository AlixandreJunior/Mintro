from django.urls import path

from apps.user.views.user import UserCreateView, UserObjectView, UserUpdateView

app_name = "user"

#: Rotas para criação, consulta e atualização de perfis de usuário.
urlpatterns = [
    path("", UserObjectView.as_view(), name="detail"),  # Obter perfil autenticado
    path("create/", UserCreateView.as_view(), name="create"),  # Criar novo usuário
    path(
        "update/", UserUpdateView.as_view(), name="update"
    ),  # Atualizar usuário logado
]
