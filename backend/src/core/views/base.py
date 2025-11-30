from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated

from core.mixins.create import CreateMixin
from core.mixins.update import UpdateMixin


class BaseView(CreateMixin, UpdateMixin, GenericAPIView):
    permission_classes = (IsAuthenticated,)
