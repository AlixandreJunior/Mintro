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


# Detail view da conquista
class AchievementDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()
    lookup_field = "pk"


# CRUD básico para Achievement
class AchievementCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer


class AchievementUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()
    lookup_field = "pk"


class AchievementDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Achievement.objects.all()
    lookup_field = "pk"


# Detail view para o log da conquista do usuário
class AchievementLogDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementLogSerializer
    queryset = AchievementLog.objects.all()
    lookup_field = "pk"


# Criar log de conquista (opcional, geralmente criado internamente)
class AchievementLogCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementLogSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AchievementListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()


class AchievementLogListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AchievementLogSerializer

    def get_queryset(self):
        return AchievementLog.objects.filter(user=self.request.user)
