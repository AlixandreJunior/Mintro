from rest_framework import serializers

from apps.health.models.hydration import HydrationLog
from apps.user.models.user import User


class HydrationLogSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por converter instâncias do modelo HydrationLog
    em representações JSON e vice-versa.

    É utilizado para registrar e exibir informações sobre a ingestão de água
    de um usuário em uma data específica.
    """

    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:  # type: ignore
        model = HydrationLog
        fields = ("id", "user", "quantity", "date")


class HydrationGoalSerializer(serializers.ModelSerializer):
    class Meta:  # type: ignore
        model = User
        fields = ("hydration_goal",)

    def validate_hydration_goal(self, value: int) -> int:
        if value <= 0:
            msg = "A meta deve ser maior que zero."
            raise serializers.ValidationError(msg)
        return value

    def to_representation(self, instance: object) -> object:
        """Retorna a meta com a chave 'goal'."""
        ret = super().to_representation(instance)
        return {"goal": ret["hydration_goal"]}
