from rest_framework import status

from apps.health.models.mindfulness import Mindfulness, MindfulnessLog
from core.tests.base import BaseAPITestCase


class MindfulnessTests(BaseAPITestCase):
    """Testes para endpoints de Mindfulness e registros de Mindfulness."""

    def setUp(self) -> None:
        super().setUp()

        # URLs nomeadas conforme o padrão do app
        self.mindfulness_list_url = "health:mindfulness:list"
        self.mindfulness_log_list_url = "health:mindfulness:log_list"
        self.mindfulness_log_register_url = "health:mindfulness:log_register"

        # Dados iniciais
        self.mindfulness = Mindfulness.objects.create(
            name="Respiração Consciente", type="Foco na Respiração"
        )

        self.log = MindfulnessLog.objects.create(
            user=self.user,
            mindfulness=self.mindfulness,
            duration=10,
            description="Registro 1",
        )

        self.payload = self.make_payload(
            mindfulness_id=self.mindfulness.pk,
            duration=15,
            description="Sessão de mindfulness bem relaxante.",
        )

    # ------------------------------
    #   Testes de Mindfulness
    # ------------------------------
    def test_get_mindfulness_list_success(self) -> None:
        """Deve retornar lista de exercícios de Mindfulness com sucesso."""
        response = self.get(self.mindfulness_list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data[0]["id"], self.mindfulness.pk)

    def test_get_mindfulness_list_empty(self) -> None:
        """Deve retornar 404 se não houver exercícios cadastrados."""
        Mindfulness.objects.all().delete()

        response = self.get(self.mindfulness_list_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"),
            "Exercícios de Mindfulness não encontrados.",
        )

    # ------------------------------
    #   Testes de registros
    # ------------------------------
    def test_get_mindfulness_log_list_success(self) -> None:
        """Deve retornar lista de registros do usuário."""
        response = self.get(self.mindfulness_log_list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data[0]["id"], self.log.pk)
        self.assertEqual(data[0]["mindfulness"]["name"], "Respiração Consciente")

    def test_get_mindfulness_log_list_empty(self) -> None:
        """Deve retornar 404 se não houver registros de Mindfulness."""
        MindfulnessLog.objects.all().delete()

        response = self.get(self.mindfulness_log_list_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"),
            "Registros de mindfulness não encontrados.",
        )

    def test_post_mindfulness_log_create_success(self) -> None:
        """Deve criar um registro de Mindfulness com sucesso."""
        MindfulnessLog.objects.all().delete()

        response = self.post(self.mindfulness_log_register_url, data=self.payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"),
            "Registro de Mindfulness criado com sucesso.",
        )
        self.assertTrue(MindfulnessLog.objects.filter(user=self.user).exists())

    def test_post_mindfulness_log_create_fail_blank(self) -> None:
        """Deve retornar erro 400 se campos obrigatórios estiverem ausentes."""
        response = self.post(self.mindfulness_log_register_url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.json()
        self.assertIn("mindfulness_id", data)
        self.assertEqual(data["mindfulness_id"][0], "Este campo é obrigatório.")

    # ------------------------------
    #   Testes de autenticação
    # ------------------------------
    def test_unauthorized_access(self) -> None:
        """Deve retornar erro 401 se o usuário não estiver autenticado."""
        self.client.logout()

        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.mindfulness_list_url, ()),
            ("get", self.mindfulness_log_list_url, ()),
            ("post", self.mindfulness_log_register_url, (self.payload,)),
        ]
        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )
