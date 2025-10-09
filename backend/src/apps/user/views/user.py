from typing import ClassVar

from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response

from apps.user.models.user import User
from apps.user.serializers.user import UserReadSerializer, UserWriteSerializer
from utils.base_view import BaseView


class BaseUserView(BaseView):
    def get_object(self) -> User:
        return self.request.user


class UserObjectView(BaseUserView, RetrieveAPIView):
    serializer_class = UserReadSerializer
    pass


class UserCreateView(BaseUserView, CreateAPIView):
    permission_classes: ClassVar[list[BasePermission]] = [AllowAny]
    serializer_class = UserWriteSerializer

    def create(self, request: any, *args: any, **kwargs: any) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response("Usuario criado com sucesso.", status=status.HTTP_201_CREATED)


class UserUpdateView(BaseUserView, UpdateAPIView):
    serializer_class = UserWriteSerializer

    def partial_update(self, request: any, *args: any, **kwargs: any) -> Response:
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(
            {"detail": "Dados atualizados com sucesso."}, status=status.HTTP_200_OK
        )
