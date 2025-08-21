from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.health.models.mindfulness import Mindfulness, MindfulnessLog
from apps.health.serializers.mindfulness import MindfulnessSerializer
from utils.usermixin import UserMixin


class MindfulnessTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.mindfulness_list = [
            Mindfulness.objects.create(
                name="Respiração Consciente", type="Foco na Respiração"
            ),
            Mindfulness.objects.create(name="Body Scan", type="Escaneamento Corporal"),
        ]

        self.mindfulness_log_list = [
            MindfulnessLog.objects.create(
                user=self.user,
                mindfulness=self.mindfulness_list[0],
                duration=10,
                description="Registro 1",
            ),
            MindfulnessLog.objects.create(
                user=self.user,
                mindfulness=self.mindfulness_list[1],
                duration=10,
                description="Registro 2",
            ),
        ]

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            {"url": reverse("health:mindfulness_list"), "method": "get"},
            {"url": reverse("health:mindfulness_log_list"), "method": "get"},
            {
                "url": reverse("health:mindfulness_log_register"),
                "method": "post",
                "data": {
                    "mindfulness": self.mindfulness_list[0].pk,
                    "duration": 10,
                    "description": "Teste",
                },
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

    def test_get_mindfulness_list(self):
        url = reverse("health:mindfulness_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_mindfulness_list_filter(self):
        url = reverse("health:mindfulness_list")
        response = self.client.get(url, {"type": "Escaneamento Corporal"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = MindfulnessSerializer(self.mindfulness_list[1]).data
        self.assertIn(expected_data, response.json())

    def test_get_mindfulness_list_filter_not_found(self):
        url = reverse("health:mindfulness_list")
        response = self.client.get(url, {"type": "InvalidType"})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"), "Exercícios de Mindfulness não encontrados."
        )

    def test_get_mindfulness_list_empty(self):
        url = reverse("health:mindfulness_list")
        Mindfulness.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"), "Exercícios de Mindfulness não encontrados."
        )

    def test_get_mindfulness_log_list(self):
        url = reverse("health:mindfulness_log_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()[0]["id"], self.mindfulness_log_list[0].id)

    def test_get_mindfulness_log_list_filter_dates(self):
        url = reverse("health:mindfulness_log_list")
        response = self.client.get(
            url, {"start_date": "2000-01-01", "end_date": "2100-01-01"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_mindfulness_log_list_invalid_dates(self):
        url = reverse("health:mindfulness_log_list")
        response = self.client.get(
            url, {"start_date": "invalid", "end_date": "invalid"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_mindfulness_log_list_empty(self):
        url = reverse("health:mindfulness_log_list")
        MindfulnessLog.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"), "Registros de Mindfulness não encontrados."
        )

    def test_post_mindfulness_log_create_success(self):
        url = reverse("health:mindfulness_log_register")
        MindfulnessLog.objects.all().delete()
        payload = {
            "mindfulness": self.mindfulness_list[0].pk,
            "duration": 15,
            "description": "Novo registro de mindfulness",
        }

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"), "Registro de Mindfulness criado com sucesso."
        )
        self.assertIn("unlocked_achievements", response.json())

    def test_post_mindfulness_log_create_fail_blank(self):
        url = reverse("health:mindfulness_log_register")
        response = self.client.post(url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["mindfulness"][0], "Este campo é obrigatório.")
