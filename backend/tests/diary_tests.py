from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from PIL import Image
from rest_framework import status

from apps.diary.models.diary import Activity, Diary
from core.tests.base import BaseAPITestCase


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

        # URLs nomeadas
        self.list_url = "diary:diary:list"
        self.detail_url = "diary:diary:detail"
        self.create_url = "diary:diary:create"
        self.update_url = "diary:diary:update"
        self.delete_url = "diary:diary:delete"

    # =================== GET ===================
    def test_get_diary_list_success(self):
        response = self.get(self.list_url)
        self.assert_response(response, status.HTTP_200_OK)

    def test_get_diary_list_ordering(self):
        Diary.objects.create(
            user=self.user, title="Novo Diário", content="Teste", mood="Bom"
        )
        response = self.get(self.list_url)
        self.assert_response(response, status.HTTP_200_OK)
        data = response.json()
        if len(data) > 1:
            self.assertGreaterEqual(data[0]["created_at"], data[-1]["created_at"])

    def test_get_diary_list_not_found(self):
        self.diary.delete()
        response = self.get(self.list_url)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diários não encontrados."
        )

    def test_get_diary_object_success(self):
        response = self.get(self.detail_url, self.diary.pk)
        self.assert_response(response, status.HTTP_200_OK)

    def test_get_diary_object_not_found(self):
        response = self.get(self.detail_url, 99999)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    # =================== POST ===================
    def test_post_diary_create_success(self):
        payload = self.make_payload(
            title="Um dia Estranho",
            content="Sinto que estou sendo testado",
            mood="Excelente",
        )
        response = self.post(self.create_url, payload)
        self.assert_response(
            response, status.HTTP_201_CREATED, "Diário criado com sucesso."
        )

    def test_post_diary_with_activity_and_photo(self):
        activity = Activity.objects.create(name="Leitura")
        payload = self.make_payload(
            title="Título", content="Conteúdo", mood="Excelente"
        )
        payload["activities_ids"] = [activity.pk]

        # Cria uma imagem em memória
        image_io = BytesIO()
        Image.new("RGB", (100, 100), color=(73, 109, 137)).save(image_io, format="JPEG")
        image_io.seek(0)

        payload["photo"] = SimpleUploadedFile(
            "photo.jpg", image_io.read(), content_type="image/jpeg"
        )
        response = self.post(self.create_url, payload, format="multipart")
        self.assert_response(
            response, status.HTTP_201_CREATED, "Diário criado com sucesso."
        )

    def test_post_diary_multiple_activities(self):
        activity1 = Activity.objects.create(name="Leitura")
        activity2 = Activity.objects.create(name="Escrita")
        payload = self.make_payload(
            title="Título com atividades", content="Conteúdo", mood="Excelente"
        )
        payload["activities_ids"] = [activity1.pk, activity2.pk]

        response = self.post(self.create_url, payload)
        self.assert_response(
            response, status.HTTP_201_CREATED, "Diário criado com sucesso."
        )

    def test_post_diary_invalid_file_type(self):
        activity = Activity.objects.create(name="Leitura")
        payload = self.make_payload(
            title="Título", content="Conteúdo", mood="Excelente"
        )
        payload["activities_ids"] = [activity.pk]

        image_io = BytesIO()
        Image.new("RGB", (100, 100), color=(73, 109, 137)).save(image_io, format="GIF")
        image_io.seek(0)

        payload["photo"] = SimpleUploadedFile(
            "photo.gif", image_io.read(), content_type="image/gif"
        )
        response = self.post(self.create_url, payload, format="multipart")
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "photo", "Envie um arquivo de imagem válido (PNG ou JPEG)."
        )

    def test_post_diary_title_min_length(self):
        payload = self.make_payload(title="A", content="Conteúdo mínimo", mood="Bom")
        response = self.post(self.create_url, payload)
        self.assert_response(
            response, status.HTTP_201_CREATED, "Diário criado com sucesso."
        )

    def test_post_diary_returns_success_message_and_achievements(self):
        self.client.force_authenticate(self.user_not_auth)
        payload = self.make_payload(
            title="Novo", content="Mensagem teste", mood="Excelente"
        )
        response = self.post(self.create_url, payload)
        self.assert_response(response, status.HTTP_201_CREATED)
        self.assertIn("detail", response.json())
        self.assertEqual(response.json()["detail"], "Diário criado com sucesso.")

    def test_post_diary_title_too_long(self):
        payload = self.make_payload(title="A" * 300)
        response = self.post(self.create_url, payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response,
            "title",
            "Certifique-se de que este campo não tenha mais de 255 caracteres.",
        )

    def test_post_diary_invalid_mood(self):
        payload = self.make_payload(mood="Horrivel")
        response = self.post(self.create_url, payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(response, "mood", '"Horrivel" não é um escolha válido.')

    def test_post_diary_create_fail_blank_content(self):
        payload = self.make_payload(title="Um dia Estranho", content="")
        response = self.post(self.create_url, payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "content", "Este campo não pode ser em branco."
        )

    # =================== PATCH ===================
    def test_patch_diary_update_success(self):
        payload = self.make_payload(content="Sinto que estou sendo testado")
        response = self.patch(self.update_url, payload, self.diary.pk)
        self.assert_response(
            response, status.HTTP_200_OK, "Diário atualizado com sucesso."
        )

    def test_patch_diary_update_multiple_fields(self):
        payload = self.make_payload(title="Novo título", content="Novo conteúdo")
        response = self.patch(self.update_url, payload, self.diary.pk)
        self.assert_response(
            response, status.HTTP_200_OK, "Diário atualizado com sucesso."
        )

    def test_patch_diary_invalid_mood(self):
        payload = self.make_payload(mood="Horrivel")
        response = self.patch(self.update_url, payload, self.diary.pk)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(response, "mood", '"Horrivel" não é um escolha válido.')

    def test_patch_diary_blank_content(self):
        payload = self.make_payload(content="")
        response = self.patch(self.update_url, payload, self.diary.pk)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "content", "Este campo não pode ser em branco."
        )

    def test_patch_diary_update_photo(self):
        image_io = BytesIO()
        Image.new("RGB", (50, 50), color=(0, 0, 0)).save(image_io, format="JPEG")
        image_io.seek(0)
        payload = self.make_payload(
            photo=SimpleUploadedFile(
                "new_photo.jpg", image_io.read(), content_type="image/jpeg"
            )
        )
        response = self.patch(
            self.update_url, payload, self.diary.pk, format="multipart"
        )
        self.assert_response(
            response, status.HTTP_200_OK, "Diário atualizado com sucesso."
        )

    def test_patch_diary_update_not_found(self):
        payload = self.make_payload(content="Alteração inválida")
        response = self.patch(self.update_url, payload, 99999)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_user_cannot_update_another_users_diary(self):
        self.client.force_authenticate(self.user_not_auth)
        payload = self.make_payload(content="Alteração indevida")
        response = self.patch(self.update_url, payload, self.diary.pk)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    # =================== DELETE ===================
    def test_delete_diary_success(self):
        response = self.delete(self.delete_url, self.diary.pk)
        self.assert_response(response, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Diary.objects.filter(pk=self.diary.pk).exists())

    def test_delete_diary_other_user(self):
        self.client.force_authenticate(self.user_not_auth)
        response = self.delete(self.delete_url, self.diary.pk)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_delete_diary_not_found(self):
        response = self.delete(self.delete_url, 99999)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    # =================== AUTENTICAÇÃO ===================
    def test_unauthorized_access(self):
        self.client.logout()
        payload = self.make_payload(
            title="Título de teste", content="Conteúdo de teste", mood="Excelente"
        )

        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.list_url, ()),
            ("get", self.detail_url, (self.diary.pk,)),
            ("post", self.create_url, (payload,)),
            ("patch", self.update_url, (payload, self.diary.pk)),
            ("delete", self.delete_url, (self.diary.pk,)),
        ]
        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )
