from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny

from core.views.user.user import BaseUserView


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

    pass
