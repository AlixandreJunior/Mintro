from django.contrib import admin

from apps.health.models.exercise import Exercise, ExerciseLog


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("id", "name", "type")
    list_filter = ("type",)
    search_fields = ("name",)


@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):  # type: ignore
    list_display = ("id", "user", "exercise", "duration", "datetime")
    list_filter = ("datetime", "exercise__type")
    search_fields = ("user__username", "exercise__name", "description")
    autocomplete_fields = ("user", "exercise")
    date_hierarchy = "datetime"
