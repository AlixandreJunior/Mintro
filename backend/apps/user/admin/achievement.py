from apps.user.models.achievement import Achievement, AchievementLevel, AchievementLog
from django.contrib import admin


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name", "description")
    ordering = ("name",)


@admin.register(AchievementLevel)
class AchievementLevelAdmin(admin.ModelAdmin):
    list_display = ("achievement", "level", "condition", "description")
    list_filter = ("level", "achievement")
    search_fields = ("achievement__name", "condition", "description")
    ordering = ("achievement", "level")


@admin.register(AchievementLog)
class AchievementLogAdmin(admin.ModelAdmin):
    list_display = ("user", "achievement_level", "date_awarded")
    list_filter = (
        "achievement_level__achievement",
        "achievement_level__level",
        "date_awarded",
    )
    search_fields = ("user__username", "achievement_level__achievement__name")
    ordering = ("-date_awarded",)
