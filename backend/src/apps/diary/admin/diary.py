from django.contrib import admin

from apps.diary.models.diary import Activity, Diary


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("id", "user", "title", "mood", "created_at")
    list_filter = ("mood", "created_at")
    search_fields = ("title", "content", "user__username")
    autocomplete_fields = ("user", "activities")
    date_hierarchy = "created_at"
