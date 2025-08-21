from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from utils.usermixin import UserMixin


class UserTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()
        self.user2 = self.make_user_not_auth()

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            {"url": reverse("user:user"), "method": "get"},
            {
                "url": reverse("user:user_update"),
                "method": "patch",
                "data": {
                    "username": "newuser",
                    "gender": "Outro",
                },
            },
        ]

        for item in urls:
            response = (
                self.client.get(item["url"])
                if item["method"] == "get"
                else self.client.patch(item["url"], data=item.get("data", {}))
            )
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
            self.assertEqual(
                response.json().get("detail"),
                "As credenciais de autenticação não foram fornecidas.",
            )

    def test_get_user_object(self):
        url = reverse("user:user")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get("username"), "username")

    def test_post_user_create_success(self):
        url = reverse("user:user_create")
        payload = {
            "first_name": "Novo",
            "last_name": "Usuário",
            "username": "novouser",
            "password": "SenhaCorreta321",
            "email": "novouser@email.com",
            "gender": "Masculino",
            "birth_date": "2000-01-01",
        }

        response = self.client.post(url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json(), "Usuario criado com sucesso.")

    def test_post_user_create_fail(self):
        url = reverse("user:user_create")

        test_cases = [
            {
                "payload": {
                    "first_name": "Novo",
                    "last_name": "Usuário",
                    "username": "",
                    "password": "SenhaCorreta321",
                    "email": "novouser@email.com",
                    "gender": "Masculino",
                    "birth_date": "2000-01-01",
                },
                "field": "username",
                "error": "Este campo não pode ser em branco.",
            },
            {
                "payload": {
                    "first_name": "Novo",
                    "last_name": "Usuário",
                    "username": "novouser",
                    "password": "123",
                    "email": "novouser@email.com",
                    "gender": "Masculino",
                    "birth_date": "2000-01-01",
                },
                "field": "password",
                "error_list": [
                    "Esta senha é muito curta. Ela precisa conter pelo menos 8 caracteres.",
                    "Esta senha é muito comum.",
                    "Esta senha é inteiramente numérica.",
                ],
            },
            {
                "payload": {
                    "first_name": "Novo",
                    "last_name": "Usuário",
                    "username": "novouser",
                    "password": "SenhaCorreta321",
                    "email": "emailerrado.com",
                    "gender": "Masculino",
                    "birth_date": "2000-01-01",
                },
                "field": "email",
                "error": "Insira um endereço de email válido.",
            },
        ]

        for case in test_cases:
            response = self.client.post(url, data=case["payload"], format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            if "error_list" in case:
                for i, msg in enumerate(case["error_list"]):
                    self.assertEqual(response.json()[case["field"]][i], msg)
            else:
                self.assertEqual(response.json()[case["field"]][0], case["error"])

    def test_patch_user_update_success(self):
        url = reverse("user:user_update")
        payload = {"username": "newuser", "gender": "Outro"}

        response = self.client.patch(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json().get("detail"), "Dados atualizados com sucesso."
        )

    def test_patch_user_update_fail_for_duplicate(self):
        url = reverse("user:user_update")
        payload = {"username": "username2", "gender": "Outro"}

        response = self.client.patch(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json().get("username")[0],
            "Um usuário com este nome de usuário já existe.",
        )
