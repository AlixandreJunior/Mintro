from rest_framework.generics import GenericAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer


class BaseView(GenericAPIView):
    success_message: str | None = None

    def perform_create(self, serializer: BaseSerializer) -> None:
        serializer.save(user=self.request.user)

    def finalize_response(
        self, request: Request, response: Response, *args: object, **kwargs: object
    ) -> Response:
        if 200 <= response.status_code < 300 and self.success_message:
            if isinstance(response.data, dict):
                response.data.setdefault("detail", self.success_message)  # type: ignore
            else:
                response.data = {"detail": self.success_message}
        return super().finalize_response(request, response, *args, **kwargs)
