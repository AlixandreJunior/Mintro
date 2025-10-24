from django.core.exceptions import ValidationError
from django.db.models.query import QuerySet

from apps.diary.models.diary import Activity
from apps.diary.models.objetives import Objective


def validate_objective_limits(
    objectives: QuerySet[Objective], activity: Activity | None
) -> None:
    if objectives.count() >= 3:
        raise ValidationError({"activity": "Máximo de 3 objetivos ativos."})
    if objectives.filter(activity=activity).exists():
        raise ValidationError(
            {"activity": "Você já possui um objetivo com essa atividade."}
        )
