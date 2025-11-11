from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.user.models.user import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # type: ignore
    """
    Configuração do painel administrativo para o modelo `User`.

    Esta classe define a forma como os usuários são exibidos, filtrados e editados
    no painel administrativo do Django. Inclui campos de controle de permissões,
    datas importantes e opções de busca e ordenação.

    Atributos:
        model (User): Modelo gerenciado pelo admin.
        list_display (tuple): Campos exibidos na listagem principal.
        list_filter (tuple): Campos que podem ser usados como filtros laterais.
        search_fields (tuple): Campos pesquisáveis.
        ordering (tuple): Ordem padrão da listagem.
        readonly_fields (tuple): Campos exibidos, mas não editáveis.
        fieldsets (tuple): Organização dos campos na página de edição do usuário.
        add_fieldsets (tuple): Estrutura dos campos ao adicionar um novo usuário.
        date_hierarchy (str): Campo usado para navegação por data.
        list_per_page (int): Quantidade de registros exibidos por página.
    """

    model = User
    list_display = ("id", "username", "email", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("username", "email")
    ordering = ("id",)
    readonly_fields = ("created_at",)

    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (_("Permissões"), {"fields": ("is_active", "is_staff", "is_superuser")}),
        (
            _("Datas Importantes"),
            {"fields": ("last_login", "date_joined", "created_at")},
        ),
    )

    add_fieldsets: tuple[tuple[None, dict[str, object]]] = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )

    date_hierarchy = "created_at"
    list_per_page = 25
