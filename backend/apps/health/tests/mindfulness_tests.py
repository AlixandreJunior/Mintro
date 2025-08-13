from apps.health.models.mindfulness import Mindfulness, MindfulnessLog
from apps.health.serializers.mindfulness import MindfulnessSerializer
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from utils.usermixin import UserMixin


class MentalHealthTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.mindfulness = Mindfulness.objects.create(
            name="Respiração Consciente",
            type="Foco na Respiração",
        )

        self.mindfulness2 = Mindfulness.objects.create(
            name="Body Scan",
            type="Escaneamento Corporal",
        )

        self.mindfulness_log = MindfulnessLog.objects.create(
            user=self.user,
            mindfulness=self.mindfulness,
            duration=10,
            description="Registro 1",
        )

        self.mindfulness_log2 = MindfulnessLog.objects.create(
            user=self.user,
            mindfulness=self.mindfulness2,
            duration=10,
            description="Registro 2",
        )

    def test_get_mindfulness_list(self):
        url = reverse("health:mindfulness_list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_mindfulness_list_filter_type(self):
        url = reverse("health:mindfulness_list")

        response = self.client.get(url, {"type": "Escaneamento Corporal"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = MindfulnessSerializer(self.mindfulness2).data
        self.assertIn(expected_data, response.json())

    def test_get_mindfulness_list_filter_type_not_found(self):
        url = reverse("health:mindfulness_list")

        response = self.client.get(url, {"type": "InvalidType"})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"),
            "Exercícios de Mindfulness não encontrados.",
        )

    def test_get_mindfulness_list_empty(self):
        url = reverse("health:mindfulness_list")
        Mindfulness.objects.all().delete()

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"),
            "Exercícios de Mindfulness não encontrados.",
        )

    def test_get_mindfulness_list_unauthorized(self):
        url = reverse("health:mindfulness_list")
        self.client.logout()

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json().get("detail"),
            "As credenciais de autenticação não foram fornecidas.",
        )

    def test_get_mindfulness_log_list(self):
        url = reverse("health:mindfulness_log_list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()[0]["id"], self.mindfulness_log.id)

    def test_get_mindfulness_log_list_filter_dates(self):
        url = reverse("health:mindfulness_log_list")

        # filtro por intervalo válido (assumindo que o objeto foi criado hoje)
        response = self.client.get(
            url, {"start_date": "2000-01-01", "end_date": "2100-01-01"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_mindfulness_log_list_filter_invalid_dates(self):
        url = reverse("health:mindfulness_log_list")

        # filtros com datas inválidas não quebram, mas ignoram
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
            response.json().get("detail"),
            "Registros de Mindfulness não encontrados.",
        )

    def test_get_mindfulness_log_list_unauthorized(self):
        url = reverse("health:mindfulness_log_list")
        self.client.logout()

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json().get("detail"),
            "As credenciais de autenticação não foram fornecidas.",
        )

    def test_post_mindfulness_log_create_success(self):
        url = reverse("health:mindfulness_log_register")

        MindfulnessLog.objects.all().delete()

        payload = {
            "mindfulness": self.mindfulness.pk,
            "duration": 15,
            "description": "Novo registro de mindfulness",
        }

        response = self.client.post(url, data=payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("detail", response.json())
        self.assertEqual(
            response.json()["detail"],
            "Registro de Mindfulness criado com sucesso.",
        )
        self.assertIn("unlocked_achievements", response.json())

    def test_post_mindfulness_log_create_fail_blank(self):
        url = reverse("health:mindfulness_log_register")

        payload = {}

        response = self.client.post(url, data=payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("mindfulness", response.json())
        self.assertEqual(response.json()["mindfulness"][0], "Este campo é obrigatório.")

    def test_post_mindfulness_log_create_unauthorized(self):
        url = reverse("health:mindfulness_log_register")
        self.client.logout()

        payload = {
            "mindfulness": self.mindfulness.pk,
            "duration": 10,
            "description": "Teste",
        }

        response = self.client.post(url, data=payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json().get("detail"),
            "As credenciais de autenticação não foram fornecidas.",
        )
