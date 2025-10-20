from backend.src.utils.base_view import BaseAchievementLogView, BaseAchievementView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)


class AchievementDetailView(BaseAchievementView, RetrieveAPIView):
    pass


class AchievementLogDetailView(BaseAchievementLogView, RetrieveAPIView):
    pass


class AchievementListView(BaseAchievementView, ListAPIView):
    pass


class AchievementLogListView(BaseAchievementLogView, ListAPIView):
    pass
