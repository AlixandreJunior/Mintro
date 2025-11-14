from typing import override

from django.db.models.query import QuerySet
from django.forms import ValidationError
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
    achivement_check = staticmethod(check_narrador_da_propria_historia)
    create_message = "Diário criado com sucesso."
    update_message = "Diário atualizado com sucesso."

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    @override
    def get_queryset(self) -> QuerySet[Diary]:
        user = self.request.user
        month = self.request.query_params.get("month")
        year = self.request.query_params.get("year")

        queryset = (
            self.model.objects.filter(user=user)
            .select_related("user")
            .prefetch_related("activities")
            .order_by("-created_at")
        )

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
            return self.model.objects.get(id=diary_id, user=self.request.user)
        except self.model.DoesNotExist as e:
            msg = "Diário não encontrado."
            raise NotFound(msg) from e
