from rest_framework import serializers

from ..models.steps import StepLog


class StepLogSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por converter instâncias do modelo StepLog
    em representações JSON e vice-versa.

    Ele é utilizado para registrar e exibir informações sobre a contagem de passos
    de um usuário em um determinado dia.

    Os campos 'id', 'user' e 'date' são somente leitura, pois são definidos
    automaticamente pelo sistema.
    """

    class Meta:  # type: ignore
        model = StepLog
        fields = ("id", "user", "date", "steps")
        read_only_fields = ("id", "user", "date")


class StepGoalSerializer(serializers.Serializer):
    goal = serializers.IntegerField(source="user.steps_goal", read_only=True)
