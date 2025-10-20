from backend.src.utils.base_view import BaseReminderView
from rest_framework import generics


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
