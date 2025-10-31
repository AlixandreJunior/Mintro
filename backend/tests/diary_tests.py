from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from django.utils import timezone
from rest_framework import status

from apps.diary.models.diary import Activity, Diary
from utils.base_tests import BaseAPITestCase


class DiaryTests(BaseAPITestCase):
    def setUp(self):
        super().setUp()

        base_time = timezone.make_aware(timezone.datetime(2000, 1, 1))
        self.diary = Diary.objects.create(
            user=self.user,
            title="Meu Diário 1",
            content="Conteúdo inicial",
            created_at=base_time,
            mood="Excelente",
        )

        self.urls = {
            "list": reverse("diary:diary:list"),
            "create": reverse("diary:diary:create"),
            "detail": reverse("diary:diary:detail", args=[self.diary.pk]),
            "update": reverse("diary:diary:update", args=[self.diary.pk]),
            "delete": reverse("diary:diary:delet", args=[self.diary.pk]),
        }

    def test_diary_list_ordering(self):
        Diary.objects.create(
            user=self.user, title="Novo Diário", content="Teste", mood="Bom"
        )
        response = self.get("diary:diary:list")
        self.assert_response(response, status.HTTP_200_OK)
        data = response.json()
        self.assertGreaterEqual(data[0]["created_at"], data[-1]["created_at"])

    def test_unauthorized_access(self):
        self.client.logout()

        endpoints = [
            ("get", self.urls["list"]),
            ("get", self.urls["detail"]),
            ("post", self.urls["create"]),
            ("patch", self.urls["update"]),
            ("delete", self.urls["delete"]),
        ]

        for method, url in endpoints:
            with self.subTest(method=method, url=url):
                response = self.request(method, url)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )

    def test_get_diary_list_success(self):
        response = self.get("diary:diary:list")
        self.assert_response(response, status.HTTP_200_OK)

    def test_get_diary_list_not_found(self):
        self.diary.delete()
        response = self.get("diary:diary:list")
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diários não encontrados."
        )

    def test_get_diary_object_success(self):
        response = self.get("diary:diary:detail", self.diary.pk)
        self.assert_response(response, status.HTTP_200_OK)

    def test_get_diary_object_not_found(self):
        response = self.get("diary:diary:detail", 99999)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_delete_diary_success(self):
        response = self.delete(self.urls["delete"])
        self.assert_response(response, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Diary.objects.filter(pk=self.diary.pk).exists())

    def test_delete_diary_not_found(self):
        response = self.delete(self.urls["delete"])
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_patch_diary_update_success(self):
        payload = self.make_payload(content="Sinto que estou sendo testado")
        response = self.patch("diary:diary:update", payload, self.diary.pk)
        self.assert_response(
            response, status.HTTP_200_OK, "Diário atualizado com sucesso."
        )

    def test_patch_diary_update_multiple_fields(self):
        payload = self.make_payload(title="Novo título", content="Novo conteúdo")
        response = self.patch("diary:diary:update", payload, self.diary.pk)
        self.assert_response(
            response, status.HTTP_200_OK, "Diário atualizado com sucesso."
        )

    def test_patch_diary_update_not_found(self):
        payload = self.make_payload(content="")
        response = self.patch("diary:diary:update", payload, 99999)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_post_diary_create_success(self):
        payload = self.make_payload(
            title="Um dia Estranho",
            content="Sinto que estou sendo testado",
            mood="Excelente",
        )
        response = self.post("diary:diary:create", payload)
        self.assert_response(
            response, status.HTTP_201_CREATED, "Diário criado com sucesso."
        )

    from django.core.files.uploadedfile import SimpleUploadedFile

    def test_post_diary_with_activity_and_photo(self):
        # Supondo que exista Activity model
        activity = Activity.objects.create(name="Leitura")
        payload = self.make_payload(
            content="Conteúdo",
            title="Título",
        )
        payload["activities_ids"] = [activity.pk]
        payload["photo"] = SimpleUploadedFile(
            "photo.jpg", b"file_content", content_type="image/jpeg"
        )

        response = self.post("diary:diary:create", payload)
        self.assert_response(response, status.HTTP_201_CREATED)
        self.assertContains(response, "activities")

    def test_post_diary_title_too_long(self):
        payload = self.make_payload(title="A" * 300)  # ultrapassa 255 chars
        response = self.post("diary:diary:create", payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response,
            "title",
            "Certifique-se de que este campo tenha no máximo 255 caracteres.",
        )

    def test_post_diary_invalid_mood(self):
        payload = self.make_payload(mood="Horrivel")
        response = self.post("diary:diary:create", payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(response, "mood", '"Horrivel" não é um escolha válido.')

    def test_post_diary_create_fail_blank(self):
        payload = self.make_payload(title="Um dia Estranho", content="")
        response = self.post("diary:diary:create", payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "content", "Este campo não pode ser em branco."
        )

    def test_user_cannot_update_another_users_diary(self):
        self.make_user_not_auth(username="other")
        payload = self.make_payload(content="Alteração indevida")
        response = self.patch("diary:diary:update", payload, self.diary.pk)
        self.assert_response(response, status.HTTP_403_FORBIDDEN)
