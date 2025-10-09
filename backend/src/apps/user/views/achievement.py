from django.db.models.query import QuerySet
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)

from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from utils.base_view import BaseView


class BaseAchievementView(BaseView):
    serializer_class = AchievementSerializer
    model = Achievement


class BaseAchievementLogView(BaseView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog


class AchievementDetailView(BaseAchievementView, RetrieveAPIView):
    pass


class AchievementLogDetailView(BaseAchievementLogView, RetrieveAPIView):
    pass


class AchievementListView(BaseAchievementView, ListAPIView):
    pass


class AchievementLogListView(BaseAchievementLogView, ListAPIView):
    def get_queryset(self) -> QuerySet:
        return AchievementLog.objects.filter(user=self.request.user)
