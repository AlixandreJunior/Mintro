from apps.user.models.achievement import Achievement, AchievementLevel, AchievementLog
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from utils.usermixin import UserMixin


class AchievementsTest(APITestCase, UserMixin):
    def setUp(self):
        self.user = self.make_user_auth()

        # Criar conquista com níveis
        self.achievement = Achievement.objects.create(
            name="Conquista",
            description="Descrição da conquista",
        )
        self.level1 = AchievementLevel.objects.create(
            achievement=self.achievement,
            level=1,
            condition="Cond1",
            description="Descrição nível 1",
        )
        self.level2 = AchievementLevel.objects.create(
            achievement=self.achievement,
            level=2,
            condition="Cond2",
            description="Descrição nível 2",
        )

        self.achievement2 = Achievement.objects.create(
            name="Conquista2",
            description="Descrição da conquista 2",
        )
        self.level3 = AchievementLevel.objects.create(
            achievement=self.achievement2,
            level=1,
            condition="Cond3",
            description="Descrição nível 3",
        )

        # Logs de conquistas para o usuário
        self.userachievement = AchievementLog.objects.create(
            user=self.user, achievement_level=self.level1
        )
        self.userachievement2 = AchievementLog.objects.create(
            user=self.user, achievement_level=self.level3
        )

    def test_get_achievements_list(self):
        url = reverse("user:achievements")  # Ajuste para sua URL real
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica se uma conquista está na resposta (verifica pelo nome)
        names = [a["name"] for a in response.json()]
        self.assertIn(self.achievement.name, names)

    def test_get_achievement_detail(self):
        url = reverse("user:achievement_detail", args=[self.achievement.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get("name"), self.achievement.name)

    def test_update_achievement(self):
        url = reverse("user:achievement_update", args=[self.achievement.pk])
        payload = {
            "name": "Conquista Atualizada",
            "description": self.achievement.description,
        }
        response = self.client.put(url, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json().get("name"), "Conquista Atualizada")

    def test_delete_achievement(self):
        url = reverse("user:achievement_delete", args=[self.achievement.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Achievement.objects.filter(pk=self.achievement.pk).exists())

    def test_get_user_achievements_log_list(self):
        url = reverse("user:achievements_user")  # Ajuste para sua URL real
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica se algum log de conquista está na resposta
        levels = [log["achievement_level"] for log in response.json()]
        self.assertTrue(len(levels) > 0)

    def test_get_achievement_log_detail(self):
        url = reverse("user:achievement_log_detail", args=[self.userachievement.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.json().get("achievement_level")["id"],
            self.userachievement.achievement_level.id,
        )

    def test_unauthorized_access(self):
        self.client.logout()
        urls = [
            reverse("user:achievements"),
            reverse("user:achievement_detail", args=[self.achievement.pk]),
            reverse("user:achievements_user"),
            reverse("user:achievement_log_detail", args=[self.userachievement.pk]),
            reverse("user:achievement_update", args=[self.achievement.pk]),
            reverse("user:achievement_delete", args=[self.achievement.pk]),
        ]
        for url in urls:
            response = self.client.get(url) if "get" in url else self.client.post(url)
            self.assertIn(
                response.status_code,
                [status.HTTP_401_UNAUTHORIZED, status.HTTP_405_METHOD_NOT_ALLOWED],
            )
