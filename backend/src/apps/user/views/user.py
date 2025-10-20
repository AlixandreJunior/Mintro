from backend.src.utils.base_view import BaseUserView
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response


class UserObjectView(BaseUserView, RetrieveAPIView):
    pass


class UserCreateView(BaseUserView, CreateAPIView):
    permission_classes = (AllowAny,)

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response("Usuario criado com sucesso.", status=status.HTTP_201_CREATED)


class UserUpdateView(BaseUserView, UpdateAPIView):
    def partial_update(
        self, request: Request, *args: object, **kwargs: object
    ) -> Response:
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(
            {"detail": "Dados atualizados com sucesso."}, status=status.HTTP_200_OK
        )
