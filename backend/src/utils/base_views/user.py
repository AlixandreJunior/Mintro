from typing import override

from django.db.models.query import QuerySet
from rest_framework import permissions

from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.models.reminder import Reminder
from apps.user.models.user import User
from apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from apps.user.serializers.reminder import ReminderSerializer
from apps.user.serializers.user import UserSerializer
from utils.base_views.base import BaseView


class BaseUserView(BaseView):
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_object(self) -> User:
        user_id = self.request.user
        return self.model.objects.get(id=user_id)


class BaseAchievementView(BaseView):
    serializer_class = AchievementSerializer
    model = Achievement

    @override
    def get_object(self) -> Achievement:
        ach_id = self.kwargs.get("ach_id")
        return self.model.objects.get(id=ach_id)

    @override
    def get_queryset(self) -> QuerySet[Achievement]:
        return self.model.objects.all()


class BaseAchievementLogView(BaseView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog

    @override
    def get_object(self) -> AchievementLog:
        log_id = self.kwargs.get("log_id")
        return self.model.objects.get(id=log_id)

    @override
    def get_queryset(self) -> QuerySet[AchievementLog]:
        return self.model.objects.filter(user=self.request.user)


class BaseReminderView(BaseView):
    model = Reminder
    serializer_class = ReminderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Reminder]:
        return self.model.objects.filter(user=self.request.user).order_by(
            "deadline", "time"
        )
