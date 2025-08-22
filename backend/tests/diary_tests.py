from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from apps.diary.models.diary import Diary
from utils.usermixin import UserMixin


class DiaryTests(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.diaries = [
            Diary.objects.create(
                user=self.user,
                title="Meu Diario",
                content="Conteudo do diario",
                datetime=timezone.make_aware(timezone.datetime(2000, 1, 1)),
                mood="Excelente",
            ),
            Diary.objects.create(
                user=self.user,
                title="Meu Diario2",
                content="Conteudo do diario",
                datetime=timezone.make_aware(timezone.datetime(2000, 1, 1)),
                mood="Excelente",
            ),
        ]

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            {"url": reverse("diary:diary_list"), "method": "get"},
            {
                "url": reverse("diary:diary_object", args=[self.diaries[0].id]),
                "method": "get",
            },
            {
                "url": reverse("diary:diary_create"),
                "method": "post",
                "data": {"title": "Teste", "content": "Conteúdo"},
            },
            {
                "url": reverse("diary:diary_update", args=[self.diaries[0].id]),
                "method": "patch",
                "data": {"content": "Conteúdo"},
            },
        ]

        for item in urls:
            response = (
                self.client.get(item["url"])
                if item["method"] == "get"
                else self.client.post(item["url"], data=item.get("data", {}))
                if item["method"] == "post"
                else self.client.patch(item["url"], data=item.get("data", {}))
            )
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
            self.assertEqual(
                response.json().get("detail"),
                "As credenciais de autenticação não foram fornecidas.",
            )

    def test_get_diary_list_success(self):
        url = reverse("diary:diary_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)

    def test_get_diary_list_not_found(self):
        url = reverse("diary:diary_list")
        Diary.objects.all().delete()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json().get("detail"), "Diários não encontrados.")

    def test_get_diary_object_success(self):
        url = reverse("diary:diary_object", args=[self.diaries[0].id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_diary_object_not_found(self):
        url = reverse("diary:diary_object", args=[99999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json().get("detail"), "Diário não encontrado.")

    def test_patch_diary_update_success(self):
        url = reverse("diary:diary_update", args=[self.diaries[0].id])
        payload = {"content": "Sinto que estou sendo testado"}
        response = self.client.patch(url, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json().get("detail"), "Diario atualizado com sucesso."
        )

    def test_patch_diary_update_not_found(self):
        url = reverse("diary:diary_update", args=[99999])
        payload = {"content": ""}
        response = self.client.patch(url, payload)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json().get("detail"), "Diário não encontrado.")

    def test_post_diary_create_success(self):
        url = reverse("diary:diary_create")
        self.diaries[0].delete()
        payload = {
            "title": "Um dia Estranho",
            "content": "Sinto que estou sendo testado",
            "mood": "Excelente",
        }
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get("detail"), "Diário criado com sucesso.")

    def test_post_diary_create_fail_blank(self):
        url = reverse("diary:diary_create")
        self.diaries[0].delete()
        payload = {"title": "Um dia Estranho", "content": ""}
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("detail").get("content")[0],
            "Este campo não pode ser em branco.",
        )
