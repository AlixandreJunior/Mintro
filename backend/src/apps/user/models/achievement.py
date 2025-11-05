from django.db import models

from apps.user.models.user import User
from utils.choices import AchievementLevelChoices


class Achievement(models.Model):
    """
    Representa uma conquista geral disponível no sistema.

    Cada conquista pode ter múltiplos níveis definidos no modelo `AchievementLevel`.
    É usada para registrar metas ou marcos que um usuário pode alcançar.

    Attributes:
        name (str): Nome da conquista.
        description (str): Descrição explicativa da conquista.
    """

    class Meta:
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self) -> str:
        """Retorna o nome da conquista como representação textual."""
        return self.name


class AchievementLevel(models.Model):
    """
    Define um nível específico de uma conquista.

    Cada conquista (`Achievement`) pode ter vários níveis,
    e cada nível define uma condição que o usuário deve cumprir
    para alcançá-lo.

    Attributes:
        achievement (Achievement): Conquista à qual este nível pertence.
        level (int): Nível da conquista, definido por `AchievementLevelChoices`.
        condition (str): Condição necessária para desbloquear este nível.
        description (str): Descrição adicional sobre o nível.
    """

    class Meta:
        verbose_name = "Achievement Level"
        verbose_name_plural = "Achievement Levels"
        unique_together = ("achievement", "level")

    achievement = models.ForeignKey(
        Achievement, on_delete=models.CASCADE, related_name="levels"
    )
    level = models.PositiveSmallIntegerField(choices=AchievementLevelChoices.choices)
    condition = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self) -> str:
        """Retorna a representação textual com nome da conquista e o nível."""
        return f"{self.achievement.name} - Nível {self.level}"


class AchievementLog(models.Model):
    """
    Registra quando um usuário alcança um determinado nível de conquista.

    Este modelo atua como um histórico de conquistas desbloqueadas
    por cada usuário.

    Attributes:
        user (User): Usuário que alcançou a conquista.
        achievement_level (AchievementLevel): Nível da conquista atingido.
        date_awarded (date): Data em que o nível foi concedido.
    """

    class Meta:
        verbose_name = "Achievement Log"
        verbose_name_plural = "Achievement Logs"
        unique_together = ("user", "achievement_level")

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement_level = models.ForeignKey(AchievementLevel, on_delete=models.CASCADE)
    date_awarded = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        """Retorna a representação textual do log (usuário e conquista)."""
        return f"{self.user.username} - {self.achievement_level}"
