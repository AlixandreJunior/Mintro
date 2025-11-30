from rest_framework import status

from apps.health.models.exercise import Exercise, ExerciseLog
from core.tests.base import BaseAPITestCase


class ExerciseTests(BaseAPITestCase):
    """Testes para endpoints de exercícios e registros de exercícios."""

    def setUp(self) -> None:
        super().setUp()
        # URLs nomeadas conforme o padrão do app
        self.exercise_list_url = "health:exercise:list"
        self.exercise_log_list_url = "health:exercise:log_list"
        self.exercise_log_register_url = "health:exercise:log_register"

        # Dados iniciais
        self.exercise = Exercise.objects.create(
            name="Alongamento Matinal",
            type="Flexibilidade",
        )

        self.log = ExerciseLog.objects.create(
            user=self.user,
            exercise=self.exercise,
            duration=15,
            description="Fiz um alongamento bem relaxante.",
        )

    # ------------------------------
    #   Testes de exercícios
    # ------------------------------
    def test_get_exercise_list_success(self) -> None:
        """Deve retornar lista de exercícios com sucesso."""
        response = self.get(self.exercise_list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["id"], self.exercise.pk)
        self.assertEqual(data[0]["name"], "Alongamento Matinal")

    def test_get_exercise_list_not_found(self) -> None:
        """Deve retornar 404 se não houver exercícios cadastrados."""
        Exercise.objects.all().delete()

        response = self.get(self.exercise_list_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json().get("detail"), "Exercícios não encontrados.")

    # ------------------------------
    #   Testes de registros
    # ------------------------------
    def test_get_exercise_log_list_success(self) -> None:
        """Deve retornar lista de registros do usuário."""
        response = self.get(self.exercise_log_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()[0]["id"], self.log.pk)
        self.assertEqual(response.json()[0]["exercise"]["name"], "Alongamento Matinal")

    def test_get_exercise_log_list_not_found(self) -> None:
        """Deve retornar 404 se não houver registros de exercícios."""
        ExerciseLog.objects.all().delete()

        response = self.get(self.exercise_log_list_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(
            response.json().get("detail"),
            "Registros de Exercícios não encontrados.",
        )

    def test_post_exercise_log_create_success(self) -> None:
        """Deve criar um registro de exercício com sucesso."""
        ExerciseLog.objects.all().delete()
        payload = self.make_payload(exercise_id=self.exercise.pk, duration=10)

        response = self.post(self.exercise_log_register_url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.json().get("detail"),
            "Registro Criado com sucesso.",
        )

        # Garante que o registro foi realmente criado
        self.assertTrue(ExerciseLog.objects.filter(user=self.user).exists())

    def test_post_exercise_log_create_fail_blank(self) -> None:
        """Deve retornar erro 400 se campos obrigatórios estiverem ausentes."""
        ExerciseLog.objects.all().delete()
        response = self.post(self.exercise_log_register_url, data={})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.json()
        self.assertIn("exercise_id", data)
        self.assertEqual(data["exercise_id"][0], "Este campo é obrigatório.")

    # ------------------------------
    #   Testes de autenticação
    # ------------------------------
    # =================== AUTENTICAÇÃO ===================
    def test_unauthorized_access(self):
        self.client.logout()
        payload = self.make_payload(
            title="Título de teste", content="Conteúdo de teste", mood="Excelente"
        )

        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.exercise_list_url, ()),
            ("get", self.exercise_log_list_url, ()),
            ("post", self.exercise_log_register_url, (payload,)),
        ]
        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )
