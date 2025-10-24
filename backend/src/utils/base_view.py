from typing import override

from django.db.models.query import QuerySet
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.generics import GenericAPIView
from rest_framework.serializers import BaseSerializer

from apps.diary.models.diary import Diary
from apps.diary.models.objetives import Objective
from apps.diary.serializers.diary import DiarySerializer
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


class BaseUserView(GenericAPIView):
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_object(self) -> User:
        user_id = self.request.user
        return self.model.objects.get(id=user_id)


class BaseAchievementView(GenericAPIView):
    serializer_class = AchievementSerializer
    model = Achievement

    @override
    def get_object(self) -> Achievement:
        ach_id = self.kwargs.get("ach_id")
        return self.model.objects.get(id=ach_id)

    @override
    def get_queryset(self) -> QuerySet[Achievement]:
        return self.model.objects.all()


class BaseAchievementLogView(GenericAPIView):
    serializer_class = AchievementLogSerializer
    model = AchievementLog

    @override
    def get_object(self) -> AchievementLog:
        log_id = self.kwargs.get("log_id")
        return self.model.objects.get(id=log_id)

    @override
    def get_queryset(self) -> QuerySet[AchievementLog]:
        return self.model.objects.filter(user=self.request.user)


class BaseReminderView(GenericAPIView):
    serializer_class = ReminderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @override
    def get_queryset(self) -> QuerySet[Reminder]:
        return Reminder.objects.filter(user=self.request.user).order_by(
            "deadline", "time"
        )

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)


class BaseDiaryView(GenericAPIView):
    serializer_class = DiarySerializer

    def get_object(self) -> Diary:
        diary_id = self.kwargs.get("id")
        try:
            return Diary.objects.get(user=self.request.user, id=diary_id)
        except Diary.DoesNotExist as e:
            message = "Diário não encontrado."
            raise NotFound(message) from e

    def get_queryset(self) -> QuerySet[Diary]:
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


class BaseObjectiveView(GenericAPIView):
    serializer_class = ObjectiveSerializer

    def get_queryset(self) -> QuerySet[Objective]:
        queryset = Objective.objects.filter(user=self.request.user)

        if not queryset:
            error_message = "Objetivos não encontrados."
            raise NotFound(error_message)
        return queryset

    def get_object(self) -> Objective:
        objective_id = self.kwargs.get("id")
        try:
            return Objective.objects.get(user=self.request.user, id=objective_id)
        except Objective.DoesNotExist as e:
            error_message = "Objetivo não encontrado."
            raise NotFound(error_message) from e
