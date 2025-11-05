from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from utils.base_views.user import BaseUserView


class UserObjectView(BaseUserView, RetrieveAPIView):
    """
    RetrieveAPIView responsável por retornar os dados do usuário autenticado.

    Herda de:
        - BaseUserView: define o modelo e o serializer do usuário.

    Uso:
        - Endpoint: /api/user/
        - Método: GET
        - Retorna: informações detalhadas do usuário autenticado.
    """

    pass


class UserCreateView(BaseUserView, CreateAPIView):
    """
    CreateAPIView responsável por registrar um novo usuário no sistema.

    Herda de:
        - BaseUserView: define o modelo e o serializer do usuário.

    Permissões:
        - Permite acesso a qualquer pessoa (AllowAny), inclusive usuários não
        autenticados.

    Uso:
        - Endpoint: /api/user/register/
        - Método: POST
        - Corpo esperado: dados necessários para criação do usuário.
        - Retorna: mensagem de sucesso após o cadastro.
    """

    permission_classes = (AllowAny,)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        """Cria um novo usuário e retorna uma mensagem de confirmação."""
        response = super().create(request, *args, **kwargs)
        response.data = {"detail": "Usuário criado com sucesso."}
        return response


class UserUpdateView(BaseUserView, UpdateAPIView):
    """
    UpdateAPIView responsável por atualizar os dados do usuário autenticado.

    Herda de:
        - BaseUserView: define o modelo, o serializer e a autenticação obrigatória.

    Uso:
        - Endpoint: /api/user/update/
        - Método: PATCH
        - Corpo esperado: campos a serem atualizados.
        - Retorna: mensagem de sucesso após atualização.
    """

    def partial_update(
        self, request: Request, *args: object, **kwargs: object
    ) -> Response:
        """Atualiza parcialmente os dados do usuário e retorna uma mensagem de
        confirmação."""
        response = super().partial_update(request, *args, **kwargs)
        response.data = {"detail": "Dados atualizados com sucesso."}
        return response
