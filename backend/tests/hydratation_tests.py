from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.health.models.hydration import HydrationLog
from utils.usermixin import UserMixin


class HydratationTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()
        self.hydration_log = HydrationLog.objects.create(user=self.user, quantity=2000)

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            {"url": reverse("health:hydratation_list"), "method": "get"},
            {
                "url": reverse("health:hydratation_register"),
                "method": "post",
                "data": {"quantity": 1000},
            },
        ]

        for item in urls:
            response = (
                self.client.get(item["url"])
                if item["method"] == "get"
                else self.client.post(item["url"], data=item.get("data", {}))
            )
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
            self.assertEqual(
                response.json().get("detail"),
                "As credenciais de autenticação não foram fornecidas.",
            )

    def test_get_hydratation_success(self):
        url = reverse("health:hydratation_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()[0].get("id"), self.hydration_log.id)

    def test_get_hydratation_not_found(self):
        url = reverse("health:hydratation_list")
        self.hydration_log.delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"), "Registros de Hidratação não encontrados."
        )

    def test_post_hydratation_log_create_success(self):
        url = reverse("health:hydratation_register")
        self.hydration_log.delete()
        payload = {"quantity": 1000}

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"),
            "Registro de Hidratação registrado com sucesso.",
        )

    def test_post_hydratation_log_create_fail_blank(self):
        url = reverse("health:hydratation_register")
        self.hydration_log.delete()
        payload = {}

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Este campo é obrigatório.", response.json().get("quantity"))
