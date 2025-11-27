from django.contrib import admin

from apps.user.models.reminder import Reminder


@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configurações do painel administrativo para o modelo `Reminder`.

    Este admin gerencia lembretes criados pelos usuários, permitindo visualização,
    filtragem e edição rápida de lembretes diários ou pontuais.

    Atributos:
        list_display (tuple): Campos exibidos na listagem principal.
        list_filter (tuple): Filtros laterais para facilitar a busca.
        search_fields (tuple): Campos pesquisáveis no painel admin.
        ordering (tuple): Ordem padrão de exibição dos registros.
        list_editable (tuple): Campos editáveis diretamente na listagem.
        readonly_fields (tuple): Campos exibidos mas não editáveis.
        date_hierarchy (str): Campo usado para navegação hierárquica por data.
    """

    list_display = ("id", "user", "title", "type", "time", "is_daily")
    list_filter = ("type", "is_daily")
    search_fields = ("title", "content", "user__username", "user__email")
    ordering = ("time",)
    list_editable = ("is_daily",)
    readonly_fields = ("date", "time")
