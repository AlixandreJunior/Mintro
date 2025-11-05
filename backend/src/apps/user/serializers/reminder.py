from datetime import date

from django.utils import timezone
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
    user_id = serializers.PrimaryKeyRelatedField(source="user", read_only=True)

    class Meta:  # type: ignore
        model = Reminder
        fields = (
            "id",
            "user_id",
            "title",
            "content",
            "date",
            "deadline",
            "time",
            "type",
            "type_display",
            "is_daily",
        )
        read_only_fields = ("id", "type_display")

    def validate_deadline(self, value: date) -> date:
        """
        Valida o campo `deadline` garantindo que não seja uma data anterior ao dia atual

        Args:
            value (date): Data informada como prazo final (deadline).

        Returns:
            date: A data validada, caso seja válida.

        Raises:
            serializers.ValidationError: Caso a data informada seja anterior à data
            atual.
        """
        if value and value < timezone.now().date():
            error_message = "O prazo (deadline) não pode ser uma data passada."
            raise serializers.ValidationError(error_message)
        return value
