from typing import override

from backend.src.apps.user.models.achievement import Achievement, AchievementLog
from backend.src.apps.user.models.reminder import Reminder
from backend.src.apps.user.models.user import User
from backend.src.apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from backend.src.apps.user.serializers.reminder import ReminderSerializer
from backend.src.apps.user.serializers.user import UserSerializer
from django.db.models.query import QuerySet
from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework.serializers import BaseSerializer


class BaseUserView(GenericAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_object(self) -> User:
        user_id = self.request.user
        return self.model.objects.get(id=user_id)


class BaseAchievementView(GenericAPIView):
    serializer_class = AchievementSerializer
    model = Achievement

    @override
    def get_object(self) -> Achievement:
        ach_id = self.kwargs.get("ach_id")
        return self.model.objects.get(id=ach_id)

    @override
    def get_queryset(self) -> QuerySet[Achievement]:
        return self.model.objects.all()


class BaseAchievementLogView(GenericAPIView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog

    @override
    def get_object(self) -> AchievementLog:
        log_id = self.kwargs.get("log_id")
        return self.model.objects.get(id=log_id)

    @override
    def get_queryset(self) -> QuerySet[AchievementLog]:
        return self.model.objects.filter(user=self.request.user)


class BaseReminderView(GenericAPIView):
    serializer_class = ReminderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Reminder]:
        return Reminder.objects.filter(user=self.request.user).order_by(
            "deadline", "time"
        )

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)
