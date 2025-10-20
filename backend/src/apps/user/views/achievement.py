from django.db.models.query import QuerySet
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)

from apps.user.models.achievement import AchievementLog
from utils.base_view import BaseAchievementLogView, BaseAchievementView


class AchievementDetailView(BaseAchievementView, RetrieveAPIView):
    pass


class AchievementLogDetailView(BaseAchievementLogView, RetrieveAPIView):
    pass


class AchievementListView(BaseAchievementView, ListAPIView):
    pass


class AchievementLogListView(BaseAchievementLogView, ListAPIView):
    def get_queryset(self) -> QuerySet:
        return AchievementLog.objects.filter(user=self.request.user)
