from rest_framework import status

from apps.health.models.hydration import HydrationLog
from core.tests.base import BaseAPITestCase


class HydrationTests(BaseAPITestCase):
    def setUp(self):
        super().setUp()
        self.hydration_log = HydrationLog.objects.create(user=self.user, quantity=2000)
        self.list_url = "health:hydration:list"
        self.create_url = "health:hydration:register"

        self.payload = self.make_payload(quantity=1000)

    # =================== AUTENTICAÇÃO ===================
    def test_unauthorized_access(self):
        self.client.logout()

        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.list_url, ()),
            ("post", self.create_url, (self.payload,)),
        ]
        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )

    # ------------------------------
    # ✅ Testes de Listagem
    # ------------------------------
    def test_get_hydration_list_success(self):
        response = self.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_hydration_list_not_found(self):
        self.hydration_log.delete()
        response = self.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"),
            "Registros de Hidratação não encontrados.",
        )

    # ------------------------------
    # 🧴 Testes de Criação
    # ------------------------------
    def test_create_hydration_log_success(self):
        self.hydration_log.delete()

        response = self.post(self.create_url, self.payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"),
            "Registro de hidratação criado com sucesso.",
        )

    def test_create_hydration_log_fail_blank(self):
        self.hydration_log.delete()
        payload = self.make_payload()

        response = self.post(self.create_url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Este campo é obrigatório.", response.json().get("quantity"))
