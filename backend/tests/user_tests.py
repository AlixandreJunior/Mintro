from rest_framework import status

from core.tests.base import BaseAPITestCase


class UserTests(BaseAPITestCase):
    def setUp(self):
        super().setUp()

        self.url_user = "user:user:detail"
        self.url_update = "user:user:update"
        self.url_create = "user:user:create"

        self.payload = self.make_payload(
            first_name="Novo",
            last_name="Usuário",
            username="novouser",
            password="SenhaCorreta321",  # noqa: S106
            email="novouser@email.com",
        )

    # ---------------------------------------------------------
    # TESTES DE AUTENTICAÇÃO
    # ---------------------------------------------------------

    # =================== AUTENTICAÇÃO ===================
    def test_unauthorized_access(self):
        self.client.logout()

        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.url_user, ()),
            ("patch", self.url_update, (self.payload,)),
        ]
        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )

    # ---------------------------------------------------------
    # TESTES DE CONSULTA DE USUÁRIO
    # ---------------------------------------------------------
    def test_get_user_object_success(self):
        """Deve retornar os dados do usuário autenticado."""
        response = self.get(self.url_user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get("username"), self.user.username)

    # ---------------------------------------------------------
    # TESTES DE CRIAÇÃO DE USUÁRIO
    # ---------------------------------------------------------
    def test_post_user_create_success(self):
        """Deve criar um usuário com sucesso."""

        response = self.post(self.url_create, self.payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get("detail"), "Usuário criado com sucesso.")

    def test_post_user_create_fail_username_blank(self):
        """Deve retornar erro quando o username estiver em branco."""
        wrong_payload = self.make_payload(
            first_name="Novo",
            last_name="Usuário",
            username="",
            password="123",  # noqa: S106
            email="novouser@email.com",
        )

        response = self.post(self.url_create, wrong_payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("username"), ["Este campo não pode ser em branco."]
        )

    def test_post_user_create_fail_password_weak(self):
        """Deve retornar erro quando a senha for fraca."""
        wrong_payload = self.make_payload(
            first_name="Novo",
            last_name="Usuário",
            username="novouser",
            password="123",  # noqa: S106
            email="novouser@email.com",
        )

        response = self.post(self.url_create, wrong_payload)

        expected_errors = [
            "Esta senha é muito curta. Ela precisa conter pelo menos 8 caracteres.",
            "Esta senha é muito comum.",
            "Esta senha é inteiramente numérica.",
        ]

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json().get("password"), expected_errors)

    def test_post_user_create_fail_invalid_email(self):
        """Deve retornar erro quando o e-mail for inválido."""
        wrong_payload = self.make_payload(
            first_name="Novo",
            last_name="Usuário",
            username="novouser",
            password="SenhaCorreta321",  # noqa: S106
            email="emailerrado.com",
        )

        response = self.post(self.url_create, data=wrong_payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("email"), ["Insira um endereço de email válido."]
        )

    # ---------------------------------------------------------
    # TESTES DE ATUALIZAÇÃO DE USUÁRIO
    # ---------------------------------------------------------
    def test_patch_user_update_success(self):
        """Deve atualizar dados do usuário com sucesso."""
        response = self.patch(self.url_update, data=self.payload)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json().get("detail"), "Dados atualizados com sucesso."
        )
