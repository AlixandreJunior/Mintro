from rest_framework import permissions, status
from rest_framework.generics import CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from apps.user.serializers.auth import LoginUserSerializer


class LoginView(CreateAPIView):
    """
    Endpoint responsável por autenticar o usuário e retornar tokens JWT.

    Requisição esperada:
    {
        "email": "usuario@exemplo.com",
        "password": "senha123"
    }

    Retorno:
    {
        "access": "<token_de_acesso>",
        "refresh": "<token_de_atualização>"
    }
    """

    serializer_class = LoginUserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "detail": "Login realizado com sucesso.",
            },
            status=status.HTTP_200_OK,
        )


class RefreshView(CreateAPIView):
    """
    Endpoint responsável por atualizar o token de acesso (access token)
    a partir de um token de atualização (refresh token) válido.

    Requisição esperada:
    {
        "refresh": "<token_de_atualização>"
    }

    Retorno:
    {
        "access": "<novo_token_de_acesso>",
        "detail": "Token atualizado com sucesso."
    }
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request: Request, *args: object, **kwargs: object) -> Response:
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"detail": "Token de atualização não fornecido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            return Response(
                {
                    "access": access_token,
                    "detail": "Token atualizado com sucesso.",
                },
                status=status.HTTP_200_OK,
            )

        except (TokenError, InvalidToken) as e:
            return Response(
                {"detail": f"Token inválido ou expirado: {e!s}"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class LogoutView(CreateAPIView):
    """
    Endpoint responsável por invalidar o token de atualização (logout).
    Idealmente, o refresh token deve ser enviado e incluído em uma blacklist.

    Requisição esperada:
    {
        "refresh": "<token_de_atualização>"
    }

    Retorno:
    {
        "detail": "Logout realizado com sucesso."
    }
    """

    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"detail": "Token de atualização não fornecido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except (TokenError, InvalidToken):
            return Response(
                {"detail": "Token inválido ou já expirado."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"detail": "Logout realizado com sucesso."},
            status=status.HTTP_200_OK,
        )
