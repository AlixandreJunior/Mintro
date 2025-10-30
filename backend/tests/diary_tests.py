from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APITestCase

from apps.diary.models.diary import Diary
from utils.usermixin import UserMixin


class DiaryTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        base_time = timezone.make_aware(timezone.datetime(2000, 1, 1))
        self.diary = Diary.objects.create(
            user=self.user,
            title="Meu Diário 1",
            content="Conteúdo inicial",
            created_at=base_time,
            mood="Excelente",
        )

    def request(
        self, method: str, url: str, data: dict[str, object] | None = None
    ) -> Response:
        method = method.lower()
        client = getattr(self.client, method)
        return client(url, data or {}, format="json")

    def assert_response(
        self, response: Response, expected_status: int, detail: str | None = None
    ):
        self.assertEqual(response.status_code, expected_status)
        if detail is not None:
            self.assertEqual(response.json().get("detail"), detail)

    def test_unauthorized_access(self):
        self.client.logout()

        urls = [
            ("get", reverse("diary:diary:list")),
            ("get", reverse("diary:diary:detail", args=[self.diary.pk])),
            ("post", reverse("diary:diary:create")),
            ("patch", reverse("diary:diary:update", args=[self.diary.pk])),
        ]

        for method, url in urls:
            with self.subTest(method=method, url=url):
                response = self.request(method, url)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )

    def test_get_diary_list_success(self):
        url = reverse("diary:diary:list")
        response = self.request("get", url)
        self.assert_response(response, status.HTTP_200_OK)

    def test_get_diary_list_not_found(self):
        self.diary.delete()
        url = reverse("diary:diary:list")
        response = self.request("get", url)
        print(response.json())
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diários não encontrados."
        )

    def test_get_diary_object_success(self):
        url = reverse("diary:diary:detail", args=[self.diary.pk])
        response = self.request("get", url)
        self.assert_response(response, status.HTTP_200_OK)

    def test_get_diary_object_not_found(self):
        url = reverse("diary:diary:detail", args=[99999])
        response = self.request("get", url)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_patch_diary_update_success(self):
        url = reverse("diary:diary:update", args=[self.diary.pk])
        payload: dict[str, object] = {"content": "Sinto que estou sendo testado"}
        response = self.request("patch", url, payload)
        print(response.json())
        self.assert_response(
            response, status.HTTP_200_OK, "Diário atualizado com sucesso."
        )

    def test_patch_diary_update_not_found(self):
        url = reverse("diary:diary:update", args=[99999])
        payload: dict[str, object] = {"content": ""}
        response = self.request("patch", url, payload)
        self.assert_response(
            response, status.HTTP_404_NOT_FOUND, "Diário não encontrado."
        )

    def test_post_diary_create_success(self):
        url = reverse("diary:diary:create")
        payload: dict[str, object] = {
            "title": "Um dia Estranho",
            "content": "Sinto que estou sendo testado",
            "mood": "Excelente",
        }
        response = self.request("post", url, payload)
        self.assert_response(
            response, status.HTTP_201_CREATED, "Diário criado com sucesso."
        )

    def test_post_diary_create_fail_blank(self):
        url = reverse("diary:diary:create")
        payload: dict[str, object] = {"title": "Um dia Estranho", "content": ""}
        response = self.request("post", url, payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("content", response.json())
        self.assertEqual(
            response.json()["content"][0],
            "Este campo não pode ser em branco.",
        )
