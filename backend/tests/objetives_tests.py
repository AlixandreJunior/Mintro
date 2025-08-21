from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.diary.models.diary import Activity
from apps.diary.models.objetives import Objective
from utils.usermixin import UserMixin


class ObjectivesTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        self.activities = [
            Activity.objects.create(name=f"Teste{i}") for i in range(1, 5)
        ]

        self.objectives = [
            Objective.objects.create(
                user=self.user,
                activity=self.activities[i],
                period=Objective.PeriodChoices.ONE_WEEK,
                repeat=Objective.RepeatChoices.ONE_TIME,
            )
            for i in range(2)
        ]

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            {"url": reverse("diary:objective"), "method": "get"},
            {
                "url": reverse("diary:objective_create"),
                "method": "post",
                "data": {
                    "activity": self.activities[0].pk,
                    "period": Objective.PeriodChoices.ONE_WEEK,
                    "repeat": Objective.RepeatChoices.ONE_TIME,
                },
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

    def test_get_objectives(self):
        url = reverse("diary:objective")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), len(self.objectives))

    def test_post_objective_create_success(self):
        url = reverse("diary:objective_create")
        payload = {
            "activity": self.activities[2].pk,
            "period": Objective.PeriodChoices.TWO_WEEKS,
            "repeat": Objective.RepeatChoices.FIVE_TIMES,
        }
        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json().get("detail"), "Objetivo criado com sucesso.")

    def test_post_objective_create_fail_for_duplicate(self):
        url = reverse("diary:objective_create")

        self.objectives[0].delete()

        Objective.objects.create(
            user=self.user,
            activity=self.activities[0],
            period=Objective.PeriodChoices.ONE_WEEK,
            repeat=Objective.RepeatChoices.ONE_TIME,
        )

        payload = {
            "activity": self.activities[0].pk,
            "period": Objective.PeriodChoices.TWO_WEEKS,
            "repeat": Objective.RepeatChoices.THREE_TIMES,
        }

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "Você já possui um objetivo com essa atividade.",
            response.json().get("activity"),
        )

    def test_post_objective_create_fail_for_limit(self):
        url = reverse("diary:objective_create")

        for i in range(3):
            Objective.objects.create(
                user=self.user,
                activity=self.activities[i],
                period=Objective.PeriodChoices.ONE_WEEK,
                repeat=Objective.RepeatChoices.ONE_TIME,
            )

        payload = {
            "activity": self.activities[3].pk,
            "period": Objective.PeriodChoices.TWO_WEEKS,
            "repeat": Objective.RepeatChoices.FIVE_TIMES,
        }

        response = self.client.post(url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "Você só pode ter no máximo 3 objetivos ativos.",
            response.json().get("activity"),
        )
