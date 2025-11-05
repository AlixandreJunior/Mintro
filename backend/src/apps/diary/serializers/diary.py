from rest_framework import serializers

from apps.diary.models.diary import Activity, Diary


class ActivitySerializer(serializers.ModelSerializer):
    """Serializer para o modelo `Activity`.

    Converte instâncias de `Activity` em representações JSON e vice-versa.
    """

    class Meta:  # type: ignore
        model = Activity
        fields = ("id", "name")


class DiarySerializer(serializers.ModelSerializer):
    """Serializer para o modelo `Diary`.

    Inclui suporte para leitura e escrita das atividades relacionadas.

    Attributes:
        activities (ActivitySerializer): Representação detalhada das atividades
        (somente leitura).
        activities_ids (PrimaryKeyRelatedField): IDs das atividades associadas
        (somente escrita).
    """

    activities = ActivitySerializer(many=True, read_only=True)
    activities_ids = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(),
        many=True,
        write_only=True,
        source="activities",
        required=False,
    )

    class Meta:  # type: ignore
        model = Diary
        fields = (
            "id",
            "user",
            "title",
            "content",
            "created_at",
            "mood",
            "activities",
            "activities_ids",
            "photo",
        )
        read_only_fields = ("user",)
