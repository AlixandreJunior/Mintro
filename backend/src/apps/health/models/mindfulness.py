from django.db import models
from django.dispatch import receiver
from django.utils import timezone

from apps.user.models.user import User


class Mindfulness(models.Model):
    class TypeChoices(models.TextChoices):
        RESPIRACAO_CONSCIENTE = "Respiração Consciente", "Respiração Consciente"
        MEDITACAO_MINDFULNESS = "Meditação Mindfulness", "Meditação Mindfulness"
        CONSCIENCIA_EMOCIONAL = "Consciência Emocional", "Consciência Emocional"
        ATIVIDADES_COTIDIANAS = "Atenção nas Atividades", "Atenção nas Atividades"

    class Meta:
        verbose_name = "Mindfulness"
        verbose_name_plural = "Mindfulness"

    name = models.CharField(max_length=255)
    type = models.CharField(max_length=22, choices=TypeChoices.choices)

    def __str__(self) -> str:
        return f"Mindfulness {self.name}"


class MindfulnessLog(models.Model):
    class Meta:
        verbose_name = "Mindfulness Log"
        verbose_name_plural = "Mindfulness Logs"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mindfulness = models.ForeignKey(Mindfulness, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()
    description = models.TextField(max_length=200)
    datetime = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"Registro de Midnfullnes de {self.user.username} em {self.datetime}"


@receiver(models.signals.post_migrate)
def create_default_mindfulness(sender: object, **kwargs: object) -> None:
    default_mindfulness = [
        {"name": "Meditação Guiada"},
        {"name": "Respiração Consciente"},
        {"name": "Body Scan"},
        {"name": "Atenção Plena"},
        {"name": "Relaxamento Muscular"},
    ]

    for item in default_mindfulness:
        Mindfulness.objects.get_or_create(
            name=item["name"],
        )
