from typing import override

from django.db.models.query import QuerySet
from rest_framework.exceptions import NotFound

from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from core.views.base import BaseView


class BaseAchievementView(BaseView):
    serializer_class = AchievementSerializer
    model = Achievement

    @override
    def get_object(self) -> Achievement:
        ach_id = self.kwargs.get("id")

        try:
            return self.model.objects.get(id=ach_id)
        except self.model.DoesNotExist as e:
            msg = "Conquista não encontrada."
            raise NotFound(msg) from e

    @override
    def get_queryset(self) -> QuerySet[Achievement]:
        return self.model.objects.all()


class BaseAchievementLogView(BaseView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog

    @override
    def get_object(self) -> AchievementLog:
        log_id = self.kwargs.get("id")

        try:
            return self.model.objects.get(id=log_id)
        except self.model.DoesNotExist as e:
            msg = "Conquista não encontrada."
            raise NotFound(msg) from e

    @override
    def get_queryset(self) -> QuerySet[AchievementLog]:
        return self.model.objects.filter(user=self.request.user)
