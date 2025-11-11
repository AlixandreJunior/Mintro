from django.db import models
from django.dispatch import receiver

from apps.diary.models.diary import Diary
from utils.signals_callable import create_achievements


@receiver(models.signals.post_migrate)
def create_default_activities(
    sender: object, app_config: object, **kwargs: object
) -> None:
    """Cria conquistas padrão após a execução de migrações.

    Args:
        sender (object): O remetente do sinal.
        app_config (object): Configuração do aplicativo.
        **kwargs (object): Argumentos adicionais.
    """
    create_achievements(sender, **kwargs)


@receiver(models.signals.post_delete, sender=Diary)
def delete_diary_photo_on_delete(
    sender: object, instance: Diary, **kwargs: object
) -> None:
    """Remove a foto associada a um diário quando ele é deletado.

    Args:
        sender (object): O remetente do sinal.
        instance (Diary): Instância de diário deletada.
        **kwargs (object): Argumentos adicionais.
    """
    if instance.photo:
        instance.photo.delete(save=False)


@receiver(models.signals.pre_save, sender=Diary)
def delete_old_diary_photo_on_change(
    sender: object, instance: Diary, **kwargs: object
) -> None:
    """Remove a foto antiga se uma nova imagem for carregada durante a atualização.

    Args:
        sender (object): O remetente do sinal.
        instance (Diary): Instância de diário sendo atualizada.
        **kwargs (object): Argumentos adicionais.
    """
    if not instance.pk:
        return

    try:
        old_instance = Diary.objects.get(pk=instance.pk)
    except Diary.DoesNotExist:
        return

    if old_instance.photo and old_instance.photo != instance.photo:
        old_instance.photo.delete(save=False)
