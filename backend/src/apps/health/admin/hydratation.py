from apps.health.models.hydratation import HydrationLog
from django.contrib import admin


@admin.register(HydrationLog)
class HydrationAdmin(admin.ModelAdmin):
    list_display = ("user", "quantity", "date")
    list_filter = ("date",)
    search_fields = ("user__username",)
