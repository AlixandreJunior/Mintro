"""Módulo responsável por verificar e conceder conquistas (achievements) aos usuários.

Este módulo contém funções que analisam o progresso do usuário em diferentes áreas do
app
(exercícios, hidratação, mindfulness, diário, etc.) e concedem automaticamente
os níveis de achievements correspondentes quando as condições são atendidas.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from apps.diary.models.diary import Diary
from apps.health.models.exercise import ExerciseLog
from apps.health.models.hydration import HydrationLog
from apps.health.models.mindfulness import MindfulnessLog
from apps.user.models.achievement import Achievement, AchievementLevel, AchievementLog

if TYPE_CHECKING:
    from django.contrib.auth.models import AbstractUser
    from django.db.models.query import QuerySet

    from apps.user.models.user import User


def grant_achievement_level(
    user: AbstractUser,
    achievement_name: str,
    progress_count: int | None = None,
    progress_today: int | None = None,
) -> None:
    """Concede um nível de achievement ao usuário se a condição for atendida.

    A função identifica o achievement pelo nome e verifica se o progresso do usuário
    atende aos critérios definidos nas condições de cada nível. Caso atenda, cria-se
    um registro (`AchievementLog`) correspondente.

    Args:
        user (AbstractUser): Usuário que está sendo avaliado.
        achievement_name (str): Nome do achievement a ser verificado.
        progress_count (int | None, optional): Progresso acumulado
        (ex: total de registros).
        progress_today (int | None, optional): Progresso diário
        (ex: número de passos hoje).

    Returns:
        None
    """
    try:
        achievement: Achievement = Achievement.objects.get(name=achievement_name)
    except Achievement.DoesNotExist:
        return

    levels: QuerySet[AchievementLevel] = achievement.levels.order_by("level")
    for level in levels:
        cond: str = level.condition
        cond_val: int | None = None

        if "steps_" in cond and progress_today is not None:
            cond_val = int(cond.split("_")[1])
            if progress_today >= cond_val:
                _create_log_if_not_exists(user, level)
        elif progress_count is not None:
            cond_val = int(cond.split("_")[1].replace("x", ""))
            if progress_count >= cond_val:
                _create_log_if_not_exists(user, level)


def _create_log_if_not_exists(
    user: AbstractUser, achievement_level: AchievementLevel
) -> None:
    """Cria um registro de conquista (`AchievementLog`) se ainda não existir.

    Args:
        user (AbstractUser): Usuário dono do registro.
        achievement_level (AchievementLevel): Nível da conquista a ser registrada.

    Returns:
        None
    """
    if not AchievementLog.objects.filter(
        user=user, achievement_level=achievement_level
    ).exists():
        AchievementLog.objects.create(user=user, achievement_level=achievement_level)


def check_bem_vindo_mintro(user: AbstractUser) -> None:
    """Concede o achievement "Bem-vindo ao Mintro" no primeiro login do usuário.

    Args:
        user (AbstractUser): Usuário autenticado.

    Returns:
        None
    """
    try:
        achievement: Achievement = Achievement.objects.get(name="Bem-vindo ao Mintro")
        level = achievement.levels.get(level=1)
        _create_log_if_not_exists(user, level)
    except Achievement.DoesNotExist:
        pass


def check_foco_total(user: AbstractUser) -> None:
    """Verifica e concede o achievement "Foco Total" com base no total de exercícios
    feitos.

    Args:
        user (AbstractUser): Usuário autenticado.

    Returns:
        None
    """
    total_exercises: int = ExerciseLog.objects.filter(user=user).count()
    grant_achievement_level(user, "Foco Total", progress_count=total_exercises)


def check_gole_a_gole(user: AbstractUser) -> None:
    """Verifica e concede o achievement "Gole a Gole" com base no total de hidratações
    registradas.

    Args:
        user (AbstractUser): Usuário autenticado.

    Returns:
        None
    """
    total_water: int = HydrationLog.objects.filter(user=user).count()
    grant_achievement_level(user, "Gole a Gole", progress_count=total_water)


def check_passos_consciencia(user: AbstractUser, steps_today: int) -> None:
    """Verifica e concede o achievement "Passos de Consciência" conforme passos diários.

    Args:
        user (AbstractUser): Usuário autenticado.
        steps_today (int): Número de passos dados no dia.

    Returns:
        None
    """
    grant_achievement_level(user, "Passos de Consciência", progress_today=steps_today)


def check_zen_total(user: User) -> None:
    """Verifica e concede o achievement "Zen Total" com base em práticas de mindfulness
    concluídas.

    Args:
        user (User): Usuário autenticado.

    Returns:
        None
    """
    total_mindfulness: int = MindfulnessLog.objects.filter(user=user).count()
    grant_achievement_level(user, "Zen Total", progress_count=total_mindfulness)


def check_narrador_da_propria_historia(user: User) -> None:
    """Verifica e concede o achievement "Narrador da própria história" com base em
    registros de diário.

    Args:
        user (User): Usuário autenticado.

    Returns:
        None
    """
    total_diary: int = Diary.objects.filter(user=user).count()
    grant_achievement_level(
        user, "Narrador da própria história", progress_count=total_diary
    )
