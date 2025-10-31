from collections.abc import Sequence
from typing import cast

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.test import APITestCase

from utils.usermixin import UserMixin

User = get_user_model()


class BaseAPITestCase(APITestCase, UserMixin):
    def setUp(self) -> None:
        self.user = self.make_user_auth()
        self.user_not_auth = self.make_user_not_auth()

    def make_payload(self, **overrides: object) -> dict[str, object]:
        payload: dict[str, object] = {}
        payload.update(**overrides)
        return payload

    def request(
        self,
        method: str,
        url: str,
        data: dict[str, object] | None = None,
        **kwargs: object,
    ) -> Response:
        client_method = getattr(self.client, method.lower())
        print(kwargs.get("format"))
        return client_method(url, data or {}, format=kwargs.get("format", "json"))

    def get(
        self, url_name: str, *args: object, **kwargs: dict[str, object]
    ) -> Response:
        url = reverse(url_name, args=args or ())
        return self.request("get", url)

    def post(
        self,
        url_name: str,
        data: dict[str, object],
        *args: object,
        **kwargs: object,
    ) -> Response:
        url = reverse(url_name, args=args or ())
        return self.request("post", url, data, **kwargs)

    def patch(
        self,
        url_name: str,
        data: dict[str, object],
        *args: object,
        **kwargs: dict[str, object],
    ) -> Response:
        url = reverse(url_name, args=args or ())
        return self.request("patch", url, data, **kwargs)

    def put(
        self,
        url_name: str,
        data: dict[str, object],
        *args: object,
        **kwargs: dict[str, object],
    ) -> Response:
        url = reverse(url_name, args=args or ())
        return self.request("put", url, data, **kwargs)

    def delete(
        self, url_name: str, *args: object, **kwargs: dict[str, object]
    ) -> Response:
        url = reverse(url_name, args=args or ())
        return self.request("delete", url)

    def assert_response(
        self, response: Response, expected_status: int | str, detail: str | None = None
    ) -> None:
        self.assertEqual(
            response.status_code,
            expected_status,
            f"Esperado {expected_status}, mas obtido {response.status_code}. Response: {response.content}",  # noqa
        )
        if detail is not None:
            self.assertEqual(response.json().get("detail"), detail)

    def assert_contains(
        self, response: Response, key: str, msg: str | None = None
    ) -> None:
        data = cast("dict[str, object]", response.json())
        self.assertIn(
            key, data, msg or f"Esperado que '{key}' esteja presente em {data}"
        )

    def assert_field_error(
        self, response: Response, field: str, expected_error: str
    ) -> None:
        data = cast("dict[str, object]", response.json())
        self.assertIn(
            field, data, f"O campo '{field}' não está presente na resposta: {data}"
        )
        value = data[field]
        if isinstance(value, Sequence) and not isinstance(value, (str, bytes)):
            self.assertEqual(
                value[0],
                expected_error,
                f"Erro inesperado em '{field}': {value}",
            )
        else:
            self.assertEqual(
                value, expected_error, f"Erro inesperado em '{field}': {value}"
            )
