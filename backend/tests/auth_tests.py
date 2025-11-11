from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from core.tests.base import BaseAPITestCase


class AuthTests(BaseAPITestCase):
    """
    Testes de autenticação e gerenciamento de tokens JWT.
    """

    def setUp(self):
        self.user = self.make_user_not_auth()

        self.login_url = "user:auth:login"
        self.logout_url = "user:auth:logout"
        self.refresh_url = "user:auth:refresh"

        self.valid_credentials = self.make_payload(
            email="username2@email.com",
            password="SenhaMuitoSegura321",  # noqa: S106
        )

        self.invalid_credentials = self.make_payload(
            email="wrong@email.com",
            password="wrongpassword",  # noqa: S106
        )

    # ---------------------------
    # LOGIN
    # ---------------------------

    def test_login_success(self):
        """Deve autenticar o usuário e retornar tokens JWT."""
        response = self.post(self.login_url, data=self.valid_credentials)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn("access", data)
        self.assertIn("refresh", data)

    def test_login_invalid_credentials(self):
        """Deve retornar erro ao usar credenciais inválidas."""
        response = self.post(self.login_url, data=self.invalid_credentials)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("detail", response.json())

    # ---------------------------
    # LOGOUT
    # ---------------------------

    def test_logout_success(self):
        """Deve invalidar o refresh token e retornar sucesso."""
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token!s}")

        response = self.post(self.logout_url, data={"refresh": str(refresh)})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["detail"], "Logout realizado com sucesso.")

    def test_logout_unauthorized(self):
        """Deve negar logout quando não autenticado."""
        response = self.post(self.logout_url, {})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # ---------------------------
    # REFRESH TOKEN
    # ---------------------------

    def test_refresh_success(self):
        """Deve gerar novo token de acesso com refresh válido."""
        refresh = RefreshToken.for_user(self.user)

        response = self.post(self.refresh_url, data={"refresh": str(refresh)})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.json())

    def test_refresh_invalid_token(self):
        """Deve retornar erro ao tentar atualizar com refresh inválido."""
        response = self.post(self.refresh_url, data={"refresh": "invalid_token"})

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
