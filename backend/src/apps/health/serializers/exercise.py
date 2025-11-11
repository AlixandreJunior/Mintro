from rest_framework import serializers

from apps.health.models.exercise import Exercise, ExerciseLog


class ExerciseSerializer(serializers.ModelSerializer):
    """Serializador simples para exibir informações de exercícios."""

    class Meta:  # type: ignore
        model = Exercise
        fields = ("id", "name", "type")


class ExerciseLogSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por lidar com os registros de exercícios (ExerciseLog).

    - Em requisições GET: o campo `exercise` retorna um objeto detalhado
      com informações do exercício (id, name, type).
    - Em requisições POST/PUT: o campo `exercise` aceita apenas o ID do exercício.

    O campo `user` e o campo `datetime` são somente leitura.
    """

    exercise = ExerciseSerializer(read_only=True)
    exercise_id = serializers.PrimaryKeyRelatedField(
        source="exercise",  # mapeia para o campo real do modelo
        queryset=Exercise.objects.all(),
        write_only=True,
    )

    class Meta:  # type: ignore
        model = ExerciseLog
        fields = (
            "id",
            "user",
            "exercise",  # exibido nos GET
            "exercise_id",  # usado nos POST/PUT
            "duration",
            "distance",
            "description",
            "datetime",
        )
        read_only_fields = ("id", "user", "datetime")
