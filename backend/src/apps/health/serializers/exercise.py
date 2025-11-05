from rest_framework import serializers

from apps.health.models.exercise import Exercise, ExerciseLog


class ExerciseSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por converter instâncias do modelo Exercise
    em representações JSON e vice-versa.

    Inclui os campos básicos que descrevem o exercício, como nome, tipo e
    se está relacionado a uma medição de distância.
    """

    class Meta:  # type: ignore
        model = Exercise
        fields = ("id", "name", "type", "is_distance")


class ExerciseLogSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por lidar com os registros de exercícios (ExerciseLog).
    Converte os dados do modelo para JSON e valida entradas vindas da API.

    O campo 'user' e o campo 'exercise' são somente leitura,
    exibindo as informações do usuário e do exercício de forma aninhada.
    """

    user = serializers.StringRelatedField(read_only=True)
    exercise = ExerciseSerializer(read_only=True)

    class Meta:  # type: ignore
        model = ExerciseLog
        fields = (
            "id",
            "user",
            "exercise",
            "duration",
            "distance",
            "description",
            "datetime",
        )
        read_only_fields = ("id", "user", "exercise", "datetime")
