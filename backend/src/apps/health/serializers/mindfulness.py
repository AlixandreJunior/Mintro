from rest_framework import serializers

from apps.health.models.mindfulness import Mindfulness, MindfulnessLog


class MindfulnessSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por converter instâncias do modelo Mindfulness
    em representações JSON e vice-versa.

    Ele é utilizado para exibir e manipular informações sobre
    diferentes tipos de práticas de mindfulness cadastradas no sistema.
    """

    class Meta:  # type: ignore
        model = Mindfulness
        fields = ("id", "name", "type")


class MindfulnessLogSerializer(serializers.ModelSerializer):
    """
    Serializador responsável por lidar com os registros de sessões de mindfulness.

    Inclui informações sobre o usuário que realizou a prática, o tipo de mindfulness,
    a duração, a descrição e a data/hora da atividade.

    Os campos 'user', 'mindfulness' e 'datetime' são somente leitura,
    pois são definidos automaticamente pelo sistema.
    """

    mindfulness = MindfulnessSerializer(read_only=True)
    mindfulness_id = serializers.PrimaryKeyRelatedField(
        source="mindfulness",  # mapeia para o campo real do modelo
        queryset=Mindfulness.objects.all(),
        write_only=True,
    )

    class Meta:  # type: ignore
        model = MindfulnessLog
        fields = (
            "id",
            "user",
            "mindfulness",
            "mindfulness_id",
            "duration",
            "description",
            "datetime",
        )
        read_only_fields = (
            "id",
            "user",
            "mindfulness",
            "datetime",
        )
