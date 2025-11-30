from django.db import models
from django.utils import timezone

from apps.user.models.user import User
from utils.choices import ReminderTypeChoices


class Reminder(models.Model):
    """
    Representa um lembrete criado por um usuário.

    O lembrete pode ser de diferentes tipos, definidos em `ReminderTypeChoices`,
    e pode ser configurado para se repetir diariamente se `is_daily` for verdadeiro.

    Attributes:
        user (User): Usuário ao qual o lembrete pertence.
        title (str): Título curto do lembrete.
        content (str): Descrição ou conteúdo do lembrete.
        date (date): Data de criação ou referência do lembrete (padrão: data atual).
        deadline (date): Data limite ou de vencimento do lembrete.
        time (time): Hora em que o lembrete foi criado (definida automaticamente).
        type (str): Tipo do lembrete, definido pelas opções em `ReminderTypeChoices`.
        is_daily (bool): Indica se o lembrete deve se repetir diariamente.
    """

    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=56)
    content = models.CharField(max_length=256)
    date = models.DateField(default=timezone.now)
    time = models.TimeField(auto_now_add=True)
    type = models.CharField(max_length=2, choices=ReminderTypeChoices.choices)
    is_daily = models.BooleanField(default=False)

    def __str__(self) -> str:
        """Retorna uma representação textual do lembrete (título e usuário)."""
        return f"{self.title} - {self.user.username}"
