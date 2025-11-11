from datetime import timedelta

from django.utils import timezone
from rest_framework import status

from apps.user.models.reminder import Reminder
from core.tests.base import BaseAPITestCase


class ReminderTests(BaseAPITestCase):
    """Testes de integração para o CRUD de lembretes (Reminders)."""

    def setUp(self):
        super().setUp()

        # Definição das URLs nomeadas (seguindo o padrão `app_name:view_name`)

        # Cria lembrete inicial
        self.reminder = Reminder.objects.create(
            user=self.user,
            title="Primeiro lembrete",
            content="Conteúdo inicial",
            date=timezone.now().date(),
            deadline=timezone.now().date() + timedelta(days=3),
            type="HW",
            is_daily=False,
        )
        self.url_list = "user:reminder:list"
        self.url_create = "user:reminder:create"
        self.url_detail = "user:reminder:detail"
        self.url_update = "user:reminder:update"
        self.url_delete = "user:reminder:delete"

        # Payload base
        self.payload = self.make_payload(
            title="Novo lembrete",
            content="Descrição do novo lembrete",
            date=timezone.now().date(),
            deadline=timezone.now().date() + timedelta(days=5),
            type="HD",
            is_daily=True,
        )

    # ============================================================
    # TESTES DE AUTENTICAÇÃO
    # ============================================================
    def test_unauthorized_access(self):
        """Deve retornar erro 401 quando o usuário não estiver autenticado."""
        self.client.logout()

        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.url_list, ()),
            ("post", self.url_create, (self.payload,)),
        ]

        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )

    # ============================================================
    # TESTES DE LISTAGEM
    # ============================================================
    def test_get_reminder_list_success(self):
        """Deve listar todos os lembretes do usuário autenticado."""
        response = self.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["title"], "Primeiro lembrete")

    # ============================================================
    # TESTES DE CRIAÇÃO
    # ============================================================
    def test_post_reminder_create_success(self):
        """Deve criar um lembrete com sucesso."""
        response = self.post(self.url_create, self.payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            Reminder.objects.filter(title=self.payload["title"]).exists(),
            "O lembrete deveria ter sido criado com sucesso.",
        )

    def test_post_reminder_create_fail_past_deadline(self):
        """Deve retornar erro ao criar lembrete com deadline passado."""
        wrong_payload = self.make_payload(
            title="Deadline antigo",
            content="Data inválida",
            date=timezone.now().date(),
            deadline=timezone.now().date() - timedelta(days=1),
            type="HW",
            is_daily=False,
        )

        response = self.post(self.url_create, wrong_payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("deadline"),
            ["O prazo (deadline) não pode ser uma data passada."],
        )

    # ============================================================
    # TESTES DE DETALHE
    # ============================================================
    def test_get_reminder_detail_success(self):
        """Deve retornar os detalhes de um lembrete existente."""
        response = self.get(self.url_detail, self.reminder.pk)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get("title"), "Primeiro lembrete")

    def test_get_reminder_detail_not_found(self):
        """Deve retornar 404 ao buscar lembrete inexistente."""
        response = self.get(self.url_detail, 999)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================
    # TESTES DE ATUALIZAÇÃO
    # ============================================================
    def test_patch_reminder_update_success(self):
        """Deve atualizar dados de um lembrete existente."""
        self.payload["title"] = "Título atualizado"
        response = self.patch(self.url_update, self.payload, self.reminder.pk)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.reminder.refresh_from_db()
        self.assertEqual(self.reminder.title, "Título atualizado")

    def test_patch_reminder_update_not_found(self):
        """Deve retornar 404 ao tentar atualizar lembrete inexistente."""
        response = self.patch(self.url_update, {"title": "Inexistente"}, 999)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================
    # TESTES DE EXCLUSÃO
    # ============================================================
    def test_delete_reminder_success(self):
        """Deve excluir um lembrete com sucesso."""
        response = self.delete(self.url_delete, self.reminder.pk)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(
            Reminder.objects.filter(id=self.reminder.pk).exists(),
            "O lembrete deveria ter sido removido do banco de dados.",
        )

    def test_delete_reminder_not_found(self):
        """Deve retornar 404 ao tentar excluir lembrete inexistente."""
        response = self.delete(self.url_delete, 999)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
