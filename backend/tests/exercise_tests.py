from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.health.models.exercise import Exercise, ExerciseLog
from utils.usermixin import UserMixin


class ExerciseTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        Exercise.objects.all().delete()
        ExerciseLog.objects.all().delete()

        self.exercises = [
            Exercise.objects.create(name="Alongamento Matinal", type="Flexibilidade"),
            Exercise.objects.create(name="Corrida", type="Aeróbico"),
        ]

        self.exercise_logs = [
            ExerciseLog.objects.create(
                user=self.user,
                exercise=self.exercises[0],
                duration=15,
                description="Fiz um alongamento bem relaxante.",
            ),
            ExerciseLog.objects.create(
                user=self.user,
                exercise=self.exercises[1],
                duration=15,
                description="Fiz uma corrida bem intensa.",
            ),
        ]

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            {"url": reverse("health:exercise_list"), "method": "get"},
            {"url": reverse("health:exercise_log_list"), "method": "get"},
            {
                "url": reverse("health:exercise_log_register"),
                "method": "post",
                "data": {"exercise": self.exercises[0].pk, "duration": 10},
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

    def test_get_exercise_list_success(self):
        url = reverse("health:exercise_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0].get("id"), self.exercises[0].pk)

    def test_get_exercise_list_not_found(self):
        url = reverse("health:exercise_list")
        Exercise.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json().get("detail"), "Exercícios não encontrados.")

    def test_get_exercise_log_list_success(self):
        url = reverse("health:exercise_log_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0].get("id"), self.exercise_logs[0].pk)

    def test_get_exercise_log_list_not_found(self):
        url = reverse("health:exercise_log_list")
        ExerciseLog.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"), "Registros de Exercícios não encontrados."
        )

    def test_post_exercise_log_create_success(self):
        url = reverse("health:exercise_log_register")
        ExerciseLog.objects.all().delete()
        payload = {"exercise": self.exercises[0].pk, "duration": 10}

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"),
            "Registro de exercícios registrado com sucesso.",
        )

    def test_post_exercise_log_create_fail_blank(self):
        url = reverse("health:exercise_log_register")
        ExerciseLog.objects.all().delete()
        payload = {}

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("exercise")[0], "Este campo é obrigatório."
        )
