from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginUserSerializer(serializers.Serializer):
    """
    Serializer responsável por validar as credenciais de login do usuário.

    Este serializer recebe um e-mail e uma senha, autentica o usuário
    utilizando o método `django.contrib.auth.authenticate`, e adiciona o objeto
    do usuário validado aos atributos retornados, caso as credenciais sejam válidas.

    Caso o e-mail ou a senha estejam incorretos, uma exceção de validação é levantada.
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs: dict[str, object]) -> dict[str, object]:
        """
        Valida as credenciais de login fornecidas pelo usuário.

        Args:
            attrs (dict[str, object]): Dicionário contendo 'email' e 'password'
            informados pelo usuário.

        Returns:
            dict[str, object]: Dicionário contendo o objeto `user` autenticado
            se as credenciais forem válidas.

        Raises:
            serializers.ValidationError: Caso o e-mail ou senha estejam incorretos.
        """
        user = authenticate(email=attrs["email"], password=attrs["password"])

        if user is not None:
            attrs["user"] = user
            return attrs

        raise serializers.ValidationError({"detail": "Usuário ou senha incorretos!!"})
