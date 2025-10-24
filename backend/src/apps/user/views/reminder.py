from rest_framework import generics

from utils.base_view import BaseReminderView


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
