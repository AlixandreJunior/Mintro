from typing import cast, override

from django.db.models.query import QuerySet
from rest_framework import permissions

from apps.user.models.user import User
from apps.user.serializers.user import UserSerializer
from core.views.base import BaseView


class BaseUserView(BaseView):
    model = User
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    create_message = "Usuário criado com sucesso."
    update_message = "Dados atualizados com sucesso."
    achivement_check = None

    @override
    def get_object(self) -> User:
        return cast("User", self.request.user)

    @override
    def get_queryset(self) -> QuerySet[User]:
        return self.model.objects.all()
