from rest_framework import status

from apps.diary.models.diary import Activity
from apps.diary.models.objetives import Objective
from utils.base_tests import BaseAPITestCase
from utils.choices import ObjectiveRepeatChoices


class ObjectivesTest(BaseAPITestCase):
    """
    Testes para as rotas de objetivos do diário.
    """

    def setUp(self):
        """
        Configura o ambiente de teste:
        - Cria 4 atividades
        - Cria 2 objetivos iniciais para o usuário autenticado
        - Define URLs para list, detail, update, delete e create
        """
        super().setUp()
        self.activities = [
            Activity.objects.create(name=f"Atividade {i}") for i in range(1, 5)
        ]
        self.objectives = [
            Objective.objects.create(
                user=self.user,
                activity=self.activities[i],
                repeat=ObjectiveRepeatChoices.ONE_TIME,
            )
            for i in range(2)
        ]

        self.list_url = "diary:objective:list"
        self.detail_url = "diary:objective:detail"
        self.update_url = "diary:objective:update"
        self.delete_url = "diary:objective:delete"
        self.create_url = "diary:objective:create"

    # =================== GET ===================
    def test_get_objectives_success(self):
        """
        Deve retornar todos os objetivos do usuário autenticado.
        Verifica se a quantidade de objetivos retornados é igual à quantidade criada.
        """
        response = self.get(self.list_url)
        self.assert_response(response, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), len(self.objectives))

    def test_get_objective_detail_success(self):
        """
        Deve retornar os detalhes de um objetivo existente.
        Verifica se todos os campos esperados estão presentes na resposta.
        """
        obj = self.objectives[0]
        response = self.get(self.detail_url, obj.pk)
        self.assert_response(response, status.HTTP_200_OK)

        expected_keys = {
            "id",
            "user",
            "activity",
            "repeat",
            "created_at",
            "week_count",
            "days_with",
            "streak",
            "best_streak",
            "success_rate_average",
            "conclusion_count",
            "diary_dates",
        }
        data = response.json()
        self.assertSetEqual(set(data.keys()), expected_keys)

    def test_get_objective_detail_invalid_id(self):
        """
        Deve retornar 404 ao buscar um objetivo que não existe.
        Verifica tratamento correto de IDs inexistentes.
        """
        response = self.get(self.detail_url, 9999)
        self.assert_response(response, status.HTTP_404_NOT_FOUND)

    # =================== PATCH ===================
    def test_patch_objective_update_success(self):
        """
        Deve atualizar o repeat de um objetivo existente.
        Verifica se a atualização retorna status 200 OK e a mensagem correta.
        """
        payload = self.make_payload(repeat=ObjectiveRepeatChoices.THREE_TIMES)
        response = self.patch(self.update_url, payload, self.objectives[0].pk)
        self.assert_response(
            response, status.HTTP_200_OK, "Objetivo atualizado com sucesso."
        )

    def test_patch_objective_update_invalid_repeat(self):
        """
        Deve falhar ao tentar atualizar o repeat com um valor inválido.
        Verifica se o status 400 BAD REQUEST é retornado e se o erro de campo é correto.
        """
        payload = self.make_payload(repeat="invalid_repeat")
        response = self.patch(self.update_url, payload, self.objectives[0].pk)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "repeat", '"invalid_repeat" não é um escolha válido.'
        )

    def test_patch_objective_update_invalid_id(self):
        """
        Deve retornar 404 ao tentar atualizar um objetivo inexistente.
        Verifica tratamento correto de IDs inexistentes.
        """
        payload = self.make_payload(repeat=ObjectiveRepeatChoices.THREE_TIMES)
        response = self.patch(self.update_url, payload, 9999)
        self.assert_response(response, status.HTTP_404_NOT_FOUND)

    # =================== DELETE ===================
    def test_delete_objective_delete_success(self):
        """
        Deve deletar um objetivo existente com sucesso.
        Verifica se o status retornado é 204 NO CONTENT e
        se o objetivo não existe mais no banco.
        """
        obj = self.objectives[0]
        response = self.delete(self.delete_url, obj.pk)
        self.assert_response(response, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Objective.objects.filter(pk=obj.pk).exists())

    def test_delete_objective_invalid_id(self):
        """
        Deve retornar 404 ao tentar deletar um objetivo que não existe.
        Verifica tratamento correto de IDs inexistentes.
        """
        response = self.delete(self.delete_url, 9999)
        self.assert_response(response, status.HTTP_404_NOT_FOUND)

    # =================== POST ===================
    def test_post_objective_create_success(self):
        """
        Deve criar um novo objetivo com sucesso.
        Verifica se o status retornado é 201 CREATED e a mensagem correta.
        """
        payload = self.make_payload(
            activities=self.activities[2].pk, repeat=ObjectiveRepeatChoices.FIVE_TIMES
        )
        response = self.post(self.create_url, payload)
        self.assert_response(
            response, status.HTTP_201_CREATED, "Objetivo criado com sucesso."
        )

    def test_post_objective_create_fail_duplicate(self):
        """
        Deve falhar ao tentar criar um objetivo duplicado para a mesma atividade.
        Verifica se o status retornado é 400 BAD REQUEST e se o erro de campo é correto.
        """
        self.objectives[0].delete()
        Objective.objects.create(
            user=self.user,
            activity=self.activities[0],
            repeat=ObjectiveRepeatChoices.ONE_TIME,
        )
        payload = self.make_payload(
            activities=self.activities[0].pk, repeat=ObjectiveRepeatChoices.FIVE_TIMES
        )
        response = self.post(self.create_url, payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "activities", "Você já possui um objetivo com essa atividade."
        )

    def test_post_objective_create_fail_for_limit(self):
        """
        Deve falhar ao tentar criar mais de 3 objetivos ativos.
        Verifica se o status retornado é 400 BAD REQUEST e se o erro de campo é correto.
        """
        for i in range(3):
            Objective.objects.create(
                user=self.user,
                activity=self.activities[i],
                repeat=ObjectiveRepeatChoices.ONE_TIME,
            )
        payload = self.make_payload(
            activities=self.activities[3].pk, repeat=ObjectiveRepeatChoices.FIVE_TIMES
        )
        response = self.post(self.create_url, payload)
        self.assert_response(response, status.HTTP_400_BAD_REQUEST)
        self.assert_field_error(
            response, "activities", "Máximo de 3 objetivo(s) ativos."
        )

    # =================== AUTENTICAÇÃO ===================
    def test_unauthorized_access(self):
        """
        Deve negar acesso (401) para usuários não autenticados em todas as rotas.
        Testa GET, POST, PATCH e DELETE sem autenticação.
        """
        self.client.logout()
        payload = self.make_payload(
            activity=self.activities[0].pk, repeat=ObjectiveRepeatChoices.ONE_TIME
        )
        endpoints: list[tuple[str, str, tuple[object, ...]]] = [
            ("get", self.list_url, ()),
            ("get", self.detail_url, (self.objectives[0].pk,)),
            ("patch", self.update_url, (payload, self.objectives[0].pk)),
            ("delete", self.delete_url, (self.objectives[0].pk,)),
            ("post", self.create_url, (payload,)),
        ]
        for method, url_name, args in endpoints:
            with self.subTest(method=method, url=url_name):
                response = getattr(self, method)(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )
