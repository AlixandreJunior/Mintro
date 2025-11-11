"""Sinal responsável por criar práticas de mindfulness padrão após migração.

Este módulo registra um sinal `post_migrate` que insere automaticamente
práticas básicas de mindfulness na tabela `Mindfulness` caso ainda não existam.

Práticas criadas por padrão:
    - Meditação Guiada
    - Respiração Consciente
    - Body Scan
    - Atenção Plena
    - Relaxamento Muscular
"""

from django.db import models
from django.dispatch import receiver

from apps.health.models.mindfulness import Mindfulness


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
