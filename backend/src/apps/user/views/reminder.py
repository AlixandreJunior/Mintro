from typing import ClassVar

from django.db.models.query import QuerySet
from rest_framework import generics, permissions
from rest_framework.serializers import Serializer

from apps.user.models.reminder import Reminder
from apps.user.serializers.reminder import ReminderSerializer


class BaseReminderView(generics.GenericAPIView):
    serializer_class: ClassVar[type[Serializer]] = ReminderSerializer
    permission_classes: ClassVar[list[permissions.BasePermission]] = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self) -> QuerySet:
        return Reminder.objects.filter(user=self.request.user).order_by(
            "deadline", "time"
        )

    def perform_create(self, serializer: Serializer) -> None:
        serializer.save(user=self.request.user)


class ReminderListView(BaseReminderView, generics.ListAPIView):
    pass


class ReminderCreateView(BaseReminderView, generics.CreateAPIView):
    pass


class ReminderDetailView(BaseReminderView, generics.RetrieveAPIView):
    pass


class ReminderUpdateView(BaseReminderView, generics.UpdateAPIView):
    pass


class ReminderDeleteView(BaseReminderView, generics.DestroyAPIView):
    pass
