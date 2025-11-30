from rest_framework import status

from apps.user.models.achievement import Achievement, AchievementLevel, AchievementLog
from core.tests.base import BaseAPITestCase


class AchievementsTest(BaseAPITestCase):
    def setUp(self):
        super().setUp()
        # ========== Dados base ==========
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

        self.achievement2 = Achievement.objects.create(
            name="Conquista 2",
            description="Descrição da conquista 2",
        )
        self.level2 = AchievementLevel.objects.create(
            achievement=self.achievement2,
            level=1,
            condition="Cond2",
            description="Descrição nível 2",
        )

        self.log1 = AchievementLog.objects.create(
            user=self.user, achievement_level=self.level1
        )
        self.log2 = AchievementLog.objects.create(
            user=self.user, achievement_level=self.level2
        )

        # ========== URLs nomeadas ==========
        self.list_url = "user:achievements:list"
        self.detail_url = "user:achievements:detail"
        self.user_list_url = "user:achievements:user_list"
        self.user_detail_url = "user:achievements:user_detail"

    # =================== GET ===================
    def test_get_achievements_list_success(self):
        """Deve retornar a lista de conquistas disponíveis"""
        response = self.get(self.list_url)
        self.assert_response(response, status.HTTP_200_OK)
        data = response.json()
        names = [item["name"] for item in data]
        self.assertIn(self.achievement.name, names)
        self.assertIn(self.achievement2.name, names)

    def test_get_achievement_detail_success(self):
        """Deve retornar os detalhes de uma conquista específica"""
        response = self.get(self.detail_url, self.achievement.pk)
        self.assert_response(response, status.HTTP_200_OK)
        self.assertEqual(response.json()["name"], self.achievement.name)

    def test_get_achievement_detail_not_found(self):
        """Deve retornar 404 se a conquista não existir"""
        response = self.get(self.detail_url, 99999)
        self.assert_response(response, status.HTTP_404_NOT_FOUND)

    def test_get_user_achievements_log_list_success(self):
        """Deve listar os registros de conquistas desbloqueadas do usuário"""
        response = self.get(self.user_list_url)
        self.assert_response(response, status.HTTP_200_OK)
        data = response.json()
        self.assertTrue(len(data) > 0)
        self.assertIn("achievement_level", data[0])

    def test_get_achievement_log_detail_success(self):
        """Deve retornar os detalhes de um registro de conquista do usuário"""
        response = self.get(self.user_detail_url, self.log1.pk)
        self.assert_response(response, status.HTTP_200_OK)
        self.assertEqual(
            response.json()["achievement_level"]["id"], self.log1.achievement_level.pk
        )

    def test_get_achievement_log_detail_not_found(self):
        """Deve retornar 404 se o registro de conquista não existir"""
        response = self.get(self.user_detail_url, 99999)
        self.assert_response(response, status.HTTP_404_NOT_FOUND)

    # =================== AUTENTICAÇÃO ===================
    def test_unauthorized_access(self):
        """Deve bloquear acesso não autenticado a todos os endpoints"""
        self.client.logout()
        endpoints: list[tuple[str, tuple[object, ...]]] = [
            (self.list_url, ()),
            (self.detail_url, (self.achievement.pk,)),
            (self.user_list_url, ()),
            (self.user_detail_url, (1,)),
        ]
        for url_name, args in endpoints:
            with self.subTest(url=url_name):
                response = self.get(url_name, *args)
                self.assert_response(
                    response,
                    status.HTTP_401_UNAUTHORIZED,
                    "As credenciais de autenticação não foram fornecidas.",
                )
