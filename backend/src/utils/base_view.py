from typing import ClassVar

from django.db import models
from rest_framework import generics, permissions
from rest_framework.serializers import Serializer


class BaseView(generics.GenericAPIView):
    serializer_class: ClassVar[type[Serializer]]
    permission_classes: ClassVar[list[permissions.BasePermission]] = [
        permissions.IsAuthenticated
    ]
    model: ClassVar[type[models.Model]] = None
    lookup_field: ClassVar[str] = "pk"
    ordering: ClassVar[list[str]] = []
