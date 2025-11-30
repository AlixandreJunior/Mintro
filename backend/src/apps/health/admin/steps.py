from django.contrib import admin

from apps.health.models.steps import StepLog


@admin.register(StepLog)
class StepsLogAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("user", "steps", "date")
    list_filter = ("date", "user")
    search_fields = ("user__username",)
    ordering = ("-date",)
