from django.contrib import admin

from apps.health.models.hydration import HydrationLog


@admin.register(HydrationLog)
class HydrationAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("user", "quantity", "date")
    list_filter = ("date",)
    search_fields = ("user__username",)
