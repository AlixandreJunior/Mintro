from rest_framework import permissions, status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .serializers import LoginUserSerializer


class LoginView(CreateAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        print(serializer.is_valid())
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )


class RefreshView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
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
                {"access": access_token, "detail": "Token atualizado com sucesso."},
                status=status.HTTP_200_OK,
            )

        except TokenError as e:
            return Response(
                {"detail": f"Token inválido: {e!s}"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class LogoutView(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        return Response(
            {"detail": "Logout realizado com sucesso."}, status=status.HTTP_200_OK
        )


class VerifyView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)

    def retrieve(self, request: Request, *args: object, **kwargs: object) -> Response:
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return Response(
                {"detail": "Cabeçalho de autenticação inválido."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token = auth_header.split(" ")[1]

        try:
            AccessToken(token)
            return Response({"detail": "Token válido."}, status=status.HTTP_200_OK)
        except InvalidToken as e:
            return Response(
                {"detail": f"Token inválido: {e!s}"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
