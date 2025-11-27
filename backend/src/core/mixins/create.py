from collections.abc import Callable
from typing import Any, cast

from rest_framework.mixins import CreateModelMixin
from rest_framework.request import Request
from rest_framework.response import Response

from apps.user.models.user import User


class CreateMixin(CreateModelMixin):
    """
    Mixin customizado para lidar com criação de objetos no DRF.

    Adiciona uma mensagem de sucesso no retorno e, opcionalmente,
    inclui conquistas desbloqueadas pelo usuário, caso existam.
    """

    create_message: str = "Criado com sucesso."
    achievement_check: Callable[[User], list[dict[str, Any]]] | None = None

    def create(self, request: Request, *args: object, **kwargs: object) -> Response:
        response: Response = super().create(request, *args, **kwargs)
        user: User = cast("User", request.user)

        data: dict[str, Any] = {"detail": self.create_message}

        if self.achievement_check:
            unlocked_achievements = self.achievement_check(user)
            if unlocked_achievements:
                data["unlocked_achievements"] = unlocked_achievements

        response.data = data
        return response
