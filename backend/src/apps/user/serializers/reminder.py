from rest_framework import serializers

from apps.user.models.reminder import Reminder


class ReminderSerializer(serializers.ModelSerializer):
    """
    Serializer responsável pela serialização e validação do modelo `Reminder`.

    Este serializer define como os lembretes (reminders) devem ser representados
    e validados ao serem enviados ou recebidos pela API. Ele inclui campos adicionais
    como `type_display` (exibição legível do tipo) e `user_id`
    (chave primária do usuário),
    além de garantir que o campo `deadline` não seja definido com uma data passada.
    """

    type_display = serializers.CharField(source="get_type_display", read_only=True)

    class Meta:  # type: ignore
        model = Reminder
        fields = (
            "id",
            "user",
            "title",
            "content",
            "date",
            "time",
            "type",
            "type_display",
            "is_daily",
        )
        read_only_fields = ("id", "user", "type_display")
