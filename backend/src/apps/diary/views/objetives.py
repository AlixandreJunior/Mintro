from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.diary.models.objetives import Objective
from apps.diary.serializers.objetives import (
    ObjectiveReadSerializer,
    ObjectiveWriteSerializer,
)


class ObjectiveListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ObjectiveReadSerializer

    def get_queryset(self):
        queryset = Objective.objects.filter(user=self.request.user)
        status = self.request.GET.get("status")

        if status:
            queryset = queryset.filter(status=status)

        if not queryset:
            raise NotFound("Objetivos não encontrados.")
        return queryset


class ObjectiveCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ObjectiveWriteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"detail": "Objetivo criado com sucesso."}, status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ObjectiveDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ObjectiveReadSerializer

    def get_object(self):
        id = self.kwargs.get("id")
        try:
            return Objective.objects.get(user=self.request.user, id=id)
        except Objective.DoesNotExist:
            raise NotFound("Objetivo não encontrado.")


class ObjectiveUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ObjectiveWriteSerializer

    def get_object(self):
        id = self.kwargs.get("id")
        try:
            return Objective.objects.get(user=self.request.user, id=id)
        except Objective.DoesNotExist:
            raise NotFound("Objetivo não encontrado.")


class ObjectiveDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        id = self.kwargs.get("id")
        try:
            return Objective.objects.get(user=self.request.user, id=id)
        except Objective.DoesNotExist:
            raise NotFound("Objetivo não encontrado.")
