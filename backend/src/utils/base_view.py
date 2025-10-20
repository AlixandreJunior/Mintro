from typing import override

from rest_framework import permissions
from rest_framework.generics import GenericAPIView

from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.models.user import User
from apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from apps.user.serializers.user import UserSerializer


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


class BaseAchievementLogView(GenericAPIView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog
