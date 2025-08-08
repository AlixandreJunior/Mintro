from apps.user.models.achievement import Achievement, AchievementLog
from django.contrib import admin


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    list_filter = ("category",)
    search_fields = ("name", "description")


@admin.register(AchievementLog)
class AchievementLogAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "achievement",
    )
    list_filter = ("achievement",)
    search_fields = ("user__username", "achievement__name")
