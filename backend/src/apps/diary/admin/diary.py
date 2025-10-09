from typing import ClassVar

from django.contrib import admin

from apps.diary.models.diary import Activity, Diary


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display: ClassVar[list[str]] = ["id", "name"]
    search_fields: ClassVar[list[str]] = ["name"]


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display: ClassVar[list[str]] = ["id", "user", "title", "mood", "datetime"]
    list_filter: ClassVar[list[str]] = ["mood", "datetime"]
    search_fields: ClassVar[list[str]] = ["title", "content", "user__username"]
    autocomplete_fields: ClassVar[list[str]] = ["user", "activities"]
    date_hierarchy: ClassVar[list[str]] = "datetime"
