from django.contrib import admin

from apps.diary.models.objetives import Objective


@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("activity", "user", "repeat", "created_at")
    list_filter = ("repeat",)
    search_fields = ("activity__name", "user__username")
    date_hierarchy = "created_at"
