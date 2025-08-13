from apps.health.models.exercise import Exercise, ExerciseLog
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from utils.usermixin import UserMixin


class ExerciseTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        # Limpa dados anteriores para evitar interferências
        Exercise.objects.all().delete()
        ExerciseLog.objects.all().delete()

        self.exercise = Exercise.objects.create(
            name="Alongamento Matinal",
            type="Flexibilidade",
        )

        self.exercise2 = Exercise.objects.create(
            name="Corrida",
            type="Aeróbico",
        )

        self.exercise_log = ExerciseLog.objects.create(
            user=self.user,
            exercise=self.exercise,
            duration=15,
            description="Fiz um alongamento bem relaxante.",
        )

        self.exercise_log2 = ExerciseLog.objects.create(
            user=self.user,
            exercise=self.exercise2,
            duration=15,
            description="Fiz uma corrida bem intensa.",
        )

    def test_get_exercise(self):
        url = reverse("health:exercise_list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0].get("id"), self.exercise.pk)

    def test_get_exercise_fail_for_404(self):
        url = reverse("health:exercise_list")

        Exercise.objects.all().delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json().get("detail"), "Exercícios não encontrados.")

    def test_get_exercise_fail_for_unauthorized(self):
        url = reverse("health:exercise_list")
        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json().get("detail"),
            "As credenciais de autenticação não foram fornecidas.",
        )

    def test_get_exercise_log(self):
        url = reverse("health:exercise_log_list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0].get("id"), self.exercise_log.pk)

    def test_get_exercise_log_fail_for_404(self):
        url = reverse("health:exercise_log_list")

        ExerciseLog.objects.all().delete()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"), "Registros de Exercícios não encontrados."
        )

    def test_get_exercise_log_fail_for_unauthorized(self):
        url = reverse("health:exercise_log_list")
        self.client.logout()

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json().get("detail"),
            "As credenciais de autenticação não foram fornecidas.",
        )

    def test_post_exercise_log_create(self):
        url = reverse("health:exercise_log_register")

        # Apaga logs para garantir ambiente limpo
        ExerciseLog.objects.all().delete()

        payload = {
            "exercise": self.exercise.pk,
            "duration": 10,
        }

        response = self.client.post(url, payload)

        print(response.json())

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"),
            "Registro de exercícios registrado com sucesso.",
        )

    def test_post_exercise_log_create_fail_for_blank(self):
        url = reverse("health:exercise_log_register")

        ExerciseLog.objects.all().delete()

        payload = {}

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("exercise")[0], "Este campo é obrigatório."
        )

    def test_post_exercise_log_create_fail_for_unauthorized(self):
        url = reverse("health:exercise_log_register")
        self.client.logout()

        payload = {"exercise": self.exercise.pk, "rating": 4}

        response = self.client.post(url, payload)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json().get("detail"),
            "As credenciais de autenticação não foram fornecidas.",
        )
