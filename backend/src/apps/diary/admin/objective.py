from django.contrib import admin

from apps.diary.models.objetives import Objective


@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("activity", "user", "period")
    list_filter = ("period",)
    search_fields = ("name", "description", "user__username")
