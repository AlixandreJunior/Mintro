from django.contrib import admin

from apps.diary.models.diary import Activity, Diary


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configuração de administração para o modelo Activity.

    Define como as atividades serão exibidas e pesquisadas na interface de
    administração.

    Atributos:
        list_display (tuple): Campos exibidos na lista de registros.
        search_fields (tuple): Campos que podem ser pesquisados na barra de busca.
    """

    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configuração de administração para o modelo Diary.

    Define a forma como os diários serão exibidos, filtrados e pesquisados no Django
    Admin.

    Atributos:
        list_display (tuple): Campos mostrados na listagem principal.
        list_filter (tuple): Filtros disponíveis na barra lateral.
        search_fields (tuple): Campos pesquisáveis.
        autocomplete_fields (tuple): Campos com autocomplete ativado para ForeignKey e
        ManyToMany.
        date_hierarchy (str): Campo usado para navegação hierárquica por data.
    """

    list_display = ("id", "user", "title", "mood", "created_at")
    list_filter = ("mood", "created_at")
    search_fields = ("title", "content", "user__username")
    autocomplete_fields = ("user", "activities")
    date_hierarchy = "created_at"
