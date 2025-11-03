from collections import defaultdict
from datetime import date, datetime, timedelta

from apps.diary.models.diary import Diary
from apps.diary.models.objetives import Objective


def success_rate_average(obj: Objective) -> float:
    diaries = Diary.objects.filter(user=obj.user, activities=obj.activity).order_by(
        "created_at"
    )

    repeat_target = 0
    match obj.repeat:
        case "1x":
            repeat_target = 1
        case "3x":
            repeat_target = 3
        case "5x":
            repeat_target = 5
        case _:
            repeat_target = 0

    if repeat_target <= 0:
        return 0.0

    weeks: dict[tuple[int, int], int] = defaultdict(int)
    for diary in diaries:
        d = diary.created_at.date()
        week_key = d.isocalendar()[:2]
        weeks[week_key] += 1

    if not weeks:
        return 0.0

    weekly_rates = [min(count / repeat_target, 1.0) for count in weeks.values()]
    average_rate = sum(weekly_rates) / len(weekly_rates)
    return round(average_rate * 100, 2)


def best_streak(dates: list[date]) -> int:
    if not dates:
        return 0

    best = current = 1
    for i in range(1, len(dates)):
        if dates[i] == dates[i - 1] + timedelta(days=1):
            current += 1
            best = max(best, current)
        else:
            current = 1
    return best


def streak(dates: list[date]) -> int:
    if not dates:
        return 0

    streak = 1
    for i in range(len(dates) - 1, 0, -1):
        if dates[i] == dates[i - 1] + timedelta(days=1):
            streak += 1
        elif dates[i] != dates[i - 1]:
            break

    if dates[-1] < datetime.now().date() - timedelta(days=1):
        return 0
    return streak


def conclusion_count(obj: Objective, dates: list[date]) -> int:
    if not dates:
        return 0

    try:
        repeat_target = int(obj.repeat)
    except (ValueError, TypeError):
        repeat_target = 0

    weeks: dict[tuple[int, int], int] = defaultdict(int)
    for d in dates:
        week = d.isocalendar()[:2]
        weeks[week] += 1

    return sum(1 for count in weeks.values() if count >= repeat_target)
