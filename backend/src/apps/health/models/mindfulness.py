from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from apps.user.models.user import User
from utils.choices import MindfulnessTypeChoices


class Mindfulness(models.Model):
    """
    Representa uma prática de mindfulness disponível no sistema,
    como meditação, respiração guiada ou relaxamento corporal.
    Cada prática possui um nome e um tipo definido por `MindfulnessTypeChoices`.
    """

    class Meta:
        verbose_name = "Mindfulness"
        verbose_name_plural = "Mindfulness"

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=22, choices=MindfulnessTypeChoices.choices)

    def __str__(self) -> str:
        """
        Retorna uma representação textual da prática de mindfulness.
        """
        return f"Mindfulness {self.name}"


class MindfulnessLog(models.Model):
    """
    Armazena um registro de uma sessão de mindfulness realizada por um usuário.
    Contém informações sobre o tipo de prática, duração,
    descrição e data/hora da atividade.
    """

    class Meta:
        verbose_name = "Mindfulness Log"
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()
    description = models.TextField(max_length=200)
    datetime = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"Registro de Mindfulness de {self.user.username} em {self.datetime}"


@receiver(models.signals.post_migrate)
def create_default_mindfulness(sender: type[models.Model], **kwargs: object) -> None:
    """Cria práticas de mindfulness padrão após migrações do banco.

    Args:
        sender (type[models.Model]): Modelo que enviou o sinal.
        **kwargs (object): Argumentos adicionais do sinal.

    Returns:
        None: Apenas garante que os registros padrão de `Mindfulness`
        existam no banco de dados.
    """
    default_mindfulness: list[dict[str, str]] = [
        {"name": "Meditação Guiada"},
        {"name": "Respiração Consciente"},
        {"name": "Body Scan"},
        {"name": "Atenção Plena"},
        {"name": "Relaxamento Muscular"},
    ]

    for item in default_mindfulness:
        Mindfulness.objects.get_or_create(name=item["name"])
