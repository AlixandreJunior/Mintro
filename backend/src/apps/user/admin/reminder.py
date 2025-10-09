from django.contrib import admin

from apps.user.models.reminder import Reminder


@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "title", "type", "deadline", "time", "is_daily")
    list_filter = ("type", "is_daily", "deadline")
    search_fields = ("title", "content", "user__username", "user__email")
    ordering = ("-deadline", "time")
    list_editable = ("is_daily",)
