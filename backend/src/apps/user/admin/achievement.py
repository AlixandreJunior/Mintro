from django.contrib import admin

from apps.user.models.achievement import Achievement, AchievementLevel, AchievementLog


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configurações do painel administrativo para o modelo `Achievement`.

    Exibe e permite a busca por conquistas disponíveis no sistema.

    Atributos:
        list_display (tuple): Campos exibidos na lista de conquistas.
        search_fields (tuple): Campos utilizados na busca.
        ordering (tuple): Ordenação padrão da lista.
    """

    list_display = ("name", "description")
    search_fields = ("name", "description")
    ordering = ("name",)


@admin.register(AchievementLevel)
class AchievementLevelAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configurações do painel administrativo para o modelo `AchievementLevel`.

    Cada nível está vinculado a uma conquista específica, indicando as condições
    necessárias para alcançá-lo.

    Atributos:
        list_display (tuple): Campos exibidos na listagem de níveis.
        list_filter (tuple): Filtros disponíveis no painel.
        search_fields (tuple): Campos incluídos na busca.
        ordering (tuple): Ordem padrão dos registros.
    """

    list_display = ("achievement", "level", "condition", "description")
    list_filter = ("level", "achievement")
    search_fields = ("achievement__name", "condition", "description")
    ordering = ("achievement", "level")


@admin.register(AchievementLog)
class AchievementLogAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configurações do painel administrativo para o modelo `AchievementLog`.

    Este log armazena quais usuários alcançaram determinados níveis de conquistas
    e em qual data isso ocorreu.

    Atributos:
        list_display (tuple): Campos mostrados na listagem de logs.
        list_filter (tuple): Filtros disponíveis para refinar a visualização.
        search_fields (tuple): Campos de busca.
        ordering (tuple): Ordenação padrão dos registros.
        readonly_fields (tuple): Campos que não podem ser editados.
        date_hierarchy (str): Campo usado para navegação hierárquica por data.
    """

    list_display = ("user", "achievement_level", "date_awarded")
    list_filter = (
        "achievement_level__achievement",
        "achievement_level__level",
        "date_awarded",
    )
    search_fields = ("user__username", "achievement_level__achievement__name")
    ordering = ("-date_awarded",)
    readonly_fields = ("date_awarded",)
    date_hierarchy = "date_awarded"
