from apps.diary.models.objetives import Objective
from django.contrib import admin


@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ("activity", "user", "period")
    list_filter = ("period",)
    search_fields = ("name", "description", "user__username")
