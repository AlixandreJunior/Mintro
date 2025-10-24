from typing import TYPE_CHECKING, cast

from django.db.models.query import QuerySet
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from apps.diary.models.diary import Activity
from apps.diary.serializers.diary import (
    ActivitySerializer,
)
from utils.base_view import BaseDiaryView
from utils.check_achievement import check_narrador_da_propria_historia

if TYPE_CHECKING:
    from apps.user.models.user import User


class ActivitiesListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ActivitySerializer

    def get_queryset(self) -> QuerySet[Activity]:
        queryset = Activity.objects.all()

        if not queryset.exists():
            error_message = "Atividades não encontradas."
            raise NotFound(error_message)
        return queryset


class DiaryListView(BaseDiaryView, ListAPIView):
    pass


class DiaryObjectView(BaseDiaryView, RetrieveAPIView):
    pass


class DiaryDeleteView(BaseDiaryView, DestroyAPIView):
    pass


class DiaryUpdateView(BaseDiaryView, UpdateAPIView):
    def update(self, request: Request, *args: object, **kwargs: object) -> Response:
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(
            {"detail": "Diario atualizado com sucesso."}, status=status.HTTP_200_OK
        )


class DiaryCreateView(BaseDiaryView, CreateAPIView):
    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)

            unlocked_achievements = check_narrador_da_propria_historia(
                cast("User", request.user)
            )

            return Response(
                {
                    "detail": "Diário criado com sucesso.",
                    "unlocked_achievements": unlocked_achievements,
                },
                status=status.HTTP_201_CREATED,
            )
        except ValidationError as e:
            return Response({"detail": e.detail}, status=status.HTTP_400_BAD_REQUEST)
