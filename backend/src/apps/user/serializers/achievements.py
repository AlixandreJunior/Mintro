from rest_framework import serializers

from apps.user.models.achievement import (
    Achievement,
    AchievementLevel,
    AchievementLog,
)


class AchievementLevelSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo AchievementLevel.

    Representa os níveis de uma conquista (Achievement), incluindo suas condições
    e descrições.

    Campos:
        - id (int): Identificador único do nível.
        - achievement (Achievement): Conquista associada a este nível.
        - level (int): Nível da conquista (ex: 1, 2, 3...).
        - condition (str): Condição necessária para alcançar este nível.
        - description (str): Descrição do que representa o nível.

    Observação:
        - Os campos 'id' e 'achievement' são somente leitura.
    """

    class Meta:  # type: ignore
        model = AchievementLevel
        fields = (
            "id",
            "achievement",
            "level",
            "condition",
            "description",
        )
        read_only_fields = ("id", "achievement")


class AchievementSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo Achievement.

    Representa uma conquista principal e seus respectivos níveis,
    incluindo detalhes como nome e descrição.

    Campos:
        - id (int): Identificador único da conquista.
        - name (str): Nome da conquista.
        - description (str): Breve explicação da conquista.
        - levels (list[AchievementLevelSerializer]): Lista dos níveis associados.

    Observação:
        - O campo 'levels' é somente leitura e exibe os níveis relacionados.
    """

    levels = AchievementLevelSerializer(many=True, read_only=True)

    class Meta:  # type: ignore
        model = Achievement
        fields = (
            "id",
            "name",
            "description",
            "levels",
        )
        read_only_fields = ("id",)


class AchievementLogSerializer(serializers.ModelSerializer):
    """
    Serializador para o modelo AchievementLog.

    Representa o registro de uma conquista desbloqueada por um usuário,
    vinculando um nível de conquista a um momento específico.

    Campos:
        - id (int): Identificador único do registro.
        - user (User): Usuário que desbloqueou a conquista.
        - achievement_level (AchievementLevelSerializer): Nível da conquista alcançado.
        - date_awarded (datetime): Data em que o usuário alcançou a conquista.

    Observação:
        - Todos os campos são somente leitura, pois representam logs imutáveis.
    """

    achievement_level = AchievementLevelSerializer(read_only=True)

    class Meta:  # type: ignore
        model = AchievementLog
        fields = (
            "id",
            "user",
            "achievement_level",
            "date_awarded",
        )
        read_only_fields = (
            "id",
            "user",
            "achievement_level",
            "date_awarded",
        )
