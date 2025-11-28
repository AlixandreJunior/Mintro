from typing import override

from django.db.models.query import QuerySet
from django.utils.dateparse import parse_date
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.serializers import BaseSerializer

from apps.diary.models.diary import Activity, Diary
from apps.diary.serializers.diary import ActivitySerializer, DiarySerializer
from core.check_achievement import check_narrador_da_propria_historia
from core.views.base import BaseView


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
    achievement_check = staticmethod(check_narrador_da_propria_historia)
    create_message = "Diário criado com sucesso."
    update_message = "Diário atualizado com sucesso."

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    @override
    def get_queryset(self) -> QuerySet[Diary]:
        queryset = self.model.objects.filter(user=self.request.user).order_by("-date")
        start_date = self.request.GET.get("start_date")
        end_date = self.request.GET.get("end_date")

        if start_date and (parsed := parse_date(start_date)):
            queryset = queryset.filter(date__gte=parsed)
        if end_date and (parsed := parse_date(end_date)):
            queryset = queryset.filter(date__lte=parsed)

        if not queryset.exists():
            message = "Diários não encontrados."
            raise NotFound(message)
        return queryset

    @override
    def get_object(self) -> Diary:
        diary_id = self.kwargs.get("id")

        try:
            return self.model.objects.get(id=diary_id, user=self.request.user)
        except self.model.DoesNotExist as e:
            msg = "Diário não encontrado."
            raise NotFound(msg) from e
