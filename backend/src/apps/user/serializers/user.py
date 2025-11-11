from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from rest_framework import serializers

from apps.user.models.user import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer responsável pela serialização e manipulação do modelo `User`.

    Este serializer trata da criação, atualização e validação de usuários,
    incluindo a configuração de senha com as regras de segurança do Django
    e a contagem de registros relacionados a diário, mindfulness e exercícios.
    """

    password = serializers.CharField(write_only=True, required=False)

    diarys_registers = serializers.SerializerMethodField()
    mindfulness_registers = serializers.SerializerMethodField()
    exercises_registers = serializers.SerializerMethodField()

    class Meta:  # type: ignore
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "diarys_registers",
            "mindfulness_registers",
            "exercises_registers",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_diarys_registers(self, obj: User) -> int:
        """
        Retorna o número de registros de diário (`Diary`) associados ao usuário.

        Args:
            obj (User): Instância do usuário.

        Returns:
            int: Quantidade de registros de diário.
        """
        return obj.diary_set.count()

    def get_mindfulness_registers(self, obj: User) -> int:
        """
        Retorna o número de registros de mindfulness (`MindfulnessLog`) do usuário.

        Args:
            obj (User): Instância do usuário.

        Returns:
            int: Quantidade de registros de mindfulness.
        """
        return obj.mindfulnesslog_set.count()

    def get_exercises_registers(self, obj: User) -> int:
        """
        Retorna o número de registros de exercícios (`ExerciseLog`) do usuário.

        Args:
            obj (User): Instância do usuário.

        Returns:
            int: Quantidade de registros de exercícios.
        """
        return obj.exerciselog_set.count()

    def validate_password(self, value: str) -> str:
        """
        Valida a senha do usuário utilizando as regras definidas pelo Django.

        Args:
            value (str): Senha informada pelo usuário.

        Returns:
            str: A senha validada.

        Raises:
            serializers.ValidationError: Caso a senha não atenda aos critérios de
            validação.
        """
        try:
            password_validation.validate_password(value, self.instance)
        except ValidationError as e:
            raise serializers.ValidationError(list(e.messages)) from e
        return value

    def create(self, validated_data: dict[str, str]) -> User:
        """
        Cria um novo usuário, configurando a senha de forma segura.

        Args:
            validated_data (dict[str, str]): Dados validados para criação do usuário.

        Returns:
            User: Instância do usuário criada.
        """
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance: User, validated_data: dict[str, str]) -> User:
        """
        Atualiza os dados de um usuário existente, incluindo a senha (se fornecida).

        Args:
            instance (User): Instância do usuário a ser atualizada.
            validated_data (dict[str, str]): Dados validados com possíveis alterações.

        Returns:
            User: Instância do usuário atualizada.
        """
        password = validated_data.pop("password", None)
        super().update(instance, validated_data)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
