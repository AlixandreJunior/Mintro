from rest_framework.mixins import UpdateModelMixin
from rest_framework.request import Request
from rest_framework.response import Response


class UpdateMixin(UpdateModelMixin):
    update_message: str

    def update(self, request: Request, *args: object, **kwargs: object) -> Response:
        response = super().update(request, *args, **kwargs)
        response.data = {"detail": self.update_message}
        return response
