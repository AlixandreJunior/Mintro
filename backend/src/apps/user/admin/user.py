from apps.user.models.user import User
from django.contrib import admin
from django.utils.translation import gettext_lazy as _


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = (
        "id",
        "username",
        "email",
        "is_active",
        "created_at",
    )
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

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "notifications",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )


admin.site.register(User, UserAdmin)
