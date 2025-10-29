from typing import TYPE_CHECKING, cast

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
from rest_framework.serializers import BaseSerializer

from utils.base_view import BaseActivityView, BaseDiaryView
from utils.check_achievement import check_narrador_da_propria_historia

if TYPE_CHECKING:
    from apps.user.models.user import User


class ActivitiesListView(BaseActivityView, ListAPIView):
    permission_classes = (IsAuthenticated,)


class DiaryListView(BaseDiaryView, ListAPIView):
    permission_classes = (IsAuthenticated,)


class DiaryObjectView(BaseDiaryView, RetrieveAPIView):
    permission_classes = (IsAuthenticated,)


class DiaryDeleteView(BaseDiaryView, DestroyAPIView):
    permission_classes = (IsAuthenticated,)

    def destroy(self, request: Request, *args: object, **kwargs: object) -> Response:
        response = super().destroy(request, *args, **kwargs)
        response.data = {"detail": "Diário excluído com sucesso."}
        return response


class DiaryUpdateView(BaseDiaryView, UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def update(self, request: Request, *args: object, **kwargs: object) -> Response:
        response = super().update(request, *args, **kwargs)
        response.data = {"detail": "Diário atualizado com sucesso."}
        return response


class DiaryCreateView(BaseDiaryView, CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        response = super().create(request, *args, **kwargs)
        user = cast("User", request.user)

        unlocked_achievements = check_narrador_da_propria_historia(user)

        response.data = {
            "detail": "Diário criado com sucesso.",
            "unlocked_achievements": unlocked_achievements,
        }

        return response
