from typing import override

from django.db.models.query import QuerySet
from django.forms import ValidationError
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer

from apps.diary.models.diary import Activity, Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import ActivitySerializer, DiarySerializer
from apps.diary.serializers.objetives import ObjectiveSerializer
from apps.user.models.achievement import Achievement, AchievementLog
from apps.user.models.reminder import Reminder
from apps.user.models.user import User
from apps.user.serializers.achievements import (
    AchievementLogSerializer,
    AchievementSerializer,
)
from apps.user.serializers.reminder import ReminderSerializer
from apps.user.serializers.user import UserSerializer


class BaseView(GenericAPIView):
    success_message: str | None = None

    def finalize_response(
        self, request: Request, response: Response, *args: object, **kwargs: object
    ) -> Response:
        if 200 <= response.status_code < 300 and self.success_message:
            if isinstance(response.data, dict):
                response.data.setdefault("detail", self.success_message)  # type: ignore
            else:
                response.data = {"detail": self.success_message}
        return super().finalize_response(request, response, *args, **kwargs)


class BaseUserView(BaseView):
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_object(self) -> User:
        user_id = self.request.user
        return self.model.objects.get(id=user_id)


class BaseAchievementView(BaseView):
    serializer_class = AchievementSerializer
    model = Achievement

    @override
    def get_object(self) -> Achievement:
        ach_id = self.kwargs.get("ach_id")
        return self.model.objects.get(id=ach_id)

    @override
    def get_queryset(self) -> QuerySet[Achievement]:
        return self.model.objects.all()


class BaseAchievementLogView(BaseView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog

    @override
    def get_object(self) -> AchievementLog:
        log_id = self.kwargs.get("log_id")
        return self.model.objects.get(id=log_id)

    @override
    def get_queryset(self) -> QuerySet[AchievementLog]:
        return self.model.objects.filter(user=self.request.user)


class BaseReminderView(BaseView):
    model = Reminder
    serializer_class = ReminderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Reminder]:
        return self.model.objects.filter(user=self.request.user).order_by(
            "deadline", "time"
        )

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class BaseActivityView(BaseView):
    model = Activity
    serializer_class = ActivitySerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Activity]:
        queryset = self.model.objects.all()
        if not queryset:
            msg = "Nenhuma atividade encontrada."
            raise NotFound(msg)
        return super().get_queryset()


class BaseDiaryView(BaseView):
    model = Diary
    serializer_class = DiarySerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Diary]:
        user = self.request.user
        search = self.request.query_params.get("search")
        month = self.request.query_params.get("month")
        year = self.request.query_params.get("year")

        queryset = (
            self.model.objects.filter(user=user)
            .select_related("user")
            .prefetch_related("activities")
            .order_by("-created_at")
        )

        if search:
            queryset = queryset.filter(title__icontains=search)

        try:
            if month:
                queryset = queryset.filter(created_at__month=int(month))
            if year:
                queryset = queryset.filter(created_at__year=int(year))

            if not queryset:
                msg = "Diários não encontrados."
                raise NotFound(msg)

        except ValueError as e:
            msg = "Os parâmetros de mês e ano devem ser números inteiros."

            raise ValidationError(msg) from e

        return queryset

    @override
    def get_object(self) -> Diary:
        diary_id = self.kwargs.get("id")
        try:
            return self.model.objects.get(user=self.request.user, id=diary_id)
        except self.model.DoesNotExist as e:
            msg = "Diário não encontrado."
            raise NotFound(msg) from e

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class BaseObjectiveView(BaseView):
    model = Objective
    serializer_class = ObjectiveSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Objective]:
        queryset = self.model.objects.filter(user=self.request.user)

        if not queryset:
            error_message = "Objetivos não encontrados."
            raise NotFound(error_message)
        return queryset

    @override
    def get_object(self) -> Objective:
        objective_id = self.kwargs.get("id")
        try:
            return self.model.objects.get(user=self.request.user, id=objective_id)
        except self.model.DoesNotExist as e:
            error_message = "Objetivo não encontrado."
            raise NotFound(error_message) from e

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)
