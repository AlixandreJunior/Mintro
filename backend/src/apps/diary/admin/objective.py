from django.contrib import admin

from apps.diary.models.objetives import Objective


@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configuração de administração para o modelo Objective.

    Define como os objetivos serão exibidos, filtrados e pesquisados na interface
    administrativa do Django.

    Atributos:
        list_display (tuple): Campos exibidos na lista principal de registros.
        list_filter (tuple): Filtros exibidos na barra lateral do admin.
        search_fields (tuple): Campos pesquisáveis na barra de busca.
        date_hierarchy (str): Campo usado para navegação hierárquica por data.
    """

    list_display = ("activity", "user", "repeat", "created_at")
    list_filter = ("repeat",)
    search_fields = ("activity__name", "user__username")
    date_hierarchy = "created_at"
