from typing import ClassVar

from django.db import models
from rest_framework import generics, permissions
from rest_framework.serializers import Serializer


class BaseView[T: models.Model](generics.GenericAPIView):
    serializer_class: ClassVar[type[Serializer]]
    permission_classes: ClassVar[tuple[permissions.BasePermission]]
    model: T
