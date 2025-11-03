from django.core.exceptions import ValidationError
from django.db.models.query import QuerySet

from apps.diary.models.diary import Activity
from apps.diary.models.objetives import Objective


def validate_objective_limits(
    objectives: QuerySet[Objective], activity: Activity | None, max_objectives: int
) -> None:
    if objectives.count() >= max_objectives:
        msg = f"Máximo de {max_objectives} objetivo(s) ativos."
        raise ValidationError(msg)
    if objectives.filter(activity=activity).exists():
        msg = "Você já possui um objetivo com essa atividade."
        raise ValidationError(msg)
