from typing import ClassVar

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
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response

from apps.diary.models.diary import Activity, Diary
from apps.diary.serializers.diary import (
    ActivitySerializer,
    DiarySerializer,
)
from utils.base_view import BaseView
from utils.check_achievement import check_narrador_da_propria_historia


class BaseDiaryView(BaseView):
    serializer_class = DiarySerializer

    def get_object(self) -> Diary:
        diary_id = self.kwargs.get("id")
        try:
            return Diary.objects.get(user=self.request.user, id=diary_id)
        except Diary.DoesNotExist as e:
            message = "Diário não encontrado."
            raise NotFound(message) from e

    def get_queryset(self) -> QuerySet:
        user = self.request.user
        search = self.request.GET.get("search")
        month = self.request.GET.get("month")
        year = self.request.GET.get("year")

        queryset = Diary.objects.filter(user=user)

        if search:
            queryset = queryset.filter(title__icontains=search)

        if month and year:
            try:
                month = int(month)
                year = int(year)
                queryset = queryset.filter(
                    datetime__month=month, datetime__year=year
                ).order_by("-datetime")
            except ValueError as e:
                error_message = "Parâmetros de mês ou ano inválidos."
                raise NotFound(error_message) from e

        if not queryset.exists():
            error_message = "Diários não encontrados."
            raise NotFound(error_message)
        return queryset


class ActivitiesListView(ListAPIView):
    permission_classes = ClassVar[list[BasePermission]][IsAuthenticated]
    serializer_class = ActivitySerializer

    def get_queryset(self) -> QuerySet:
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
    def update(self, request: object, *args: object, **kwargs: object) -> Response:
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(
            {"detail": "Diario atualizado com sucesso."}, status=status.HTTP_200_OK
        )


class DiaryCreateView(BaseDiaryView, CreateAPIView):
    def create(self, request: object, *args: object, **kwargs: object) -> Response:
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)

            unlocked_achievements = check_narrador_da_propria_historia(request.user)

            return Response(
                {
                    "detail": "Diário criado com sucesso.",
                    "unlocked_achievements": unlocked_achievements,
                },
                status=status.HTTP_201_CREATED,
            )
        except ValidationError as e:
            return Response({"detail": e.detail}, status=status.HTTP_400_BAD_REQUEST)
