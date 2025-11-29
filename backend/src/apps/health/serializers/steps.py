from rest_framework import serializers

from apps.user.models.user import User

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


class StepGoalSerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore
        model = User
        fields = ("steps_goal",)

    def validate_steps_goal(self, value: int) -> int:
        if value <= 0:
            msg = "A meta deve ser maior que zero."
            raise serializers.ValidationError(msg)
        return value

    def to_representation(self, instance: object) -> object:
        """Retorna a meta com a chave 'goal'."""
        ret = super().to_representation(instance)
        return {"goal": ret["steps_goal"]}
