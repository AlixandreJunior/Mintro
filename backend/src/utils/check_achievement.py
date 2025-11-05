from django.contrib.auth.models import AbstractUser

from apps.diary.models.diary import Diary
from apps.health.models.exercise import ExerciseLog
from apps.health.models.hydration import HydrationLog
from apps.health.models.mindfulness import MindfulnessLog
from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.models.user import User


def grant_achievement_level(
    user, achievement_name, progress_count=None, progress_today=None
):
    try:
        achievement = Achievement.objects.get(name=achievement_name)
    except Achievement.DoesNotExist:
        return

    levels = achievement.levels.order_by("level")
    for level in levels:
        try:
            cond_val = None
            cond = level.condition
            if "steps_" in cond and progress_today is not None:
                cond_val = int(cond.split("_")[1])
                if progress_today >= cond_val:
                    _create_log_if_not_exists(user, level)
            elif progress_count is not None:
                cond_val = int(cond.split("_")[1].replace("x", ""))
                if progress_count >= cond_val:
                    _create_log_if_not_exists(user, level)
        except Exception:
            continue


def _create_log_if_not_exists(user, achievement_level):
    if not AchievementLog.objects.filter(
        user=user, achievement_level=achievement_level
    ).exists():
        AchievementLog.objects.create(user=user, achievement_level=achievement_level)


def check_bem_vindo_mintro(user: AbstractUser) -> None:
    try:
        achievement = Achievement.objects.get(name="Bem-vindo ao Mintro")
        level = achievement.levels.get(level=1)
        _create_log_if_not_exists(user, level)
    except Achievement.DoesNotExist:
        pass


def check_foco_total(user: AbstractUser) -> None:
    total_exercises = ExerciseLog.objects.filter(user=user).count()
    grant_achievement_level(user, "Foco Total", progress_count=total_exercises)


def check_gole_a_gole(user: AbstractUser) -> None:
    total_water = HydrationLog.objects.filter(user=user).count()
    grant_achievement_level(user, "Gole a Gole", progress_count=total_water)


def check_passos_consciencia(user, steps_today):
    grant_achievement_level(user, "Passos de Consciência", progress_today=steps_today)


def check_zen_total(user: AbstractUser) -> None:
    total_mindfulness = MindfulnessLog.objects.filter(user=user).count()
    grant_achievement_level(user, "Zen Total", progress_count=total_mindfulness)


def check_narrador_da_propria_historia(user: User) -> None:
    total_diary = Diary.objects.filter(user=user).count()
    grant_achievement_level(
        user, "Narrador da própria história", progress_count=total_diary
    )
