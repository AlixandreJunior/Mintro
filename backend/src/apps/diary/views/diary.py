from typing import TYPE_CHECKING, cast

from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.request import Request
from rest_framework.response import Response

from apps.diary.permissions import IsDiaryOwner
from utils.base_view import BaseActivityView, BaseDiaryView
from utils.check_achievement import check_narrador_da_propria_historia

if TYPE_CHECKING:
    from apps.user.models.user import User


class ActivitiesListView(BaseActivityView, ListAPIView):
    pass


class DiaryListView(BaseDiaryView, ListAPIView):
    pass


class DiaryObjectView(BaseDiaryView, RetrieveAPIView):
    permission_classes = (IsDiaryOwner,)
    pass


class DiaryDeleteView(BaseDiaryView, DestroyAPIView):
    permission_classes = (IsDiaryOwner,)
    success_message = "Diário excluído com sucesso."


class DiaryUpdateView(BaseDiaryView, UpdateAPIView):
    permission_classes = (IsDiaryOwner,)
    success_message = "Diário atualizado com sucesso."


class DiaryCreateView(BaseDiaryView, CreateAPIView):
    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        response = super().create(request, *args, **kwargs)
        user = cast("User", request.user)

        unlocked_achievements = check_narrador_da_propria_historia(user)

        response.data = {
            "detail": "Diário criado com sucesso.",
            "unlocked_achievements": unlocked_achievements,
        }

        return response
