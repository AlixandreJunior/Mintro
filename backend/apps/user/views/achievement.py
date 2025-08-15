from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated


class AchievementDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()
    lookup_field = "pk"

class AchievementLogDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementLogSerializer
    queryset = AchievementLog.objects.all()
    lookup_field = "pk"

class AchievementListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()


class AchievementLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementLogSerializer

    def get_queryset(self):
        return AchievementLog.objects.filter(user=self.request.user)
