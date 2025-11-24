from rest_framework import serializers

from apps.health.models.hydration import HydrationLog


class HydrationLogSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por converter instâncias do modelo HydrationLog
    em representações JSON e vice-versa.

    É utilizado para registrar e exibir informações sobre a ingestão de água
    de um usuário em uma data específica.
    """

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    goal = serializers.IntegerField(source="user.hydration_goal", read_only=True)

    class Meta:  # type: ignore
        model = HydrationLog
        fields = ("id", "user", "quantity", "date", "goal")
