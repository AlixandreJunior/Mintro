from collections.abc import Iterable
from datetime import date, datetime

from apps.diary.models.objetives import Objective
from utils.get_functions import (
    best_streak,
    conclusion_count,
    streak,
    success_rate_average,
)


def calculate_week_count(dates: Iterable[date]) -> int:
    today = datetime.now().date()
    current_week = today.isocalendar()[1]
    return sum(1 for d in dates if d.isocalendar()[1] == current_week)


def calculate_objective_metrics(obj: Objective, dates: list[date]) -> dict[str, object]:
    return {
        "streak": streak(dates),
        "best_streak": best_streak(dates),
        "conclusion_count": conclusion_count(obj, dates),
        "success_rate_average": success_rate_average(obj),
        "days_with": len(dates),
        "week_count": calculate_week_count(dates),
    }
