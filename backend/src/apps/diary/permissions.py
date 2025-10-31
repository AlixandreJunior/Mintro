from typing import override

from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView

from apps.diary.models.diary import Diary


class IsDiaryOwner(BasePermission):
    message = "Você não é o dono deste diário."

    @override
    def has_object_permission(
        self, request: Request, view: APIView, obj: Diary
    ) -> bool:
        return bool(obj.user == request.user and request.user.is_authenticated)
