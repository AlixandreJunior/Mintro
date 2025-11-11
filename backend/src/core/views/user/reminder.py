from typing import override

from django.db.models.query import QuerySet
from rest_framework import permissions
from rest_framework.serializers import BaseSerializer

from apps.user.models.reminder import Reminder
from apps.user.serializers.reminder import ReminderSerializer
from core.views.base import BaseView


class BaseReminderView(BaseView):
    model = Reminder
    serializer_class = ReminderSerializer
    permission_classes = (permissions.IsAuthenticated,)
    create_message = "Lembrete criado com sucesso."
    update_message = "Lembrete atualizado com sucesso."
    achievement_check = None

    @override
    def get_queryset(self) -> QuerySet[Reminder]:
        return self.model.objects.filter(user=self.request.user).order_by(
            "deadline", "time"
        )

    @override
    def perform_create(self, serializer: BaseSerializer) -> None:
        return serializer.save(user=self.request.user)
