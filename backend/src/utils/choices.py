from django.db import models


class ReminderTypeChoices(models.TextChoices):
    Hydration = "HD", ("Hydration")
    Exercise = "EX", ("Exercise")
    Mindfulness = "MD", ("Mindfulness")
    Diary = "DR", ("Diary")
    Others = "OT", ("Others")


class AchievementLevelChoices(models.IntegerChoices):
    Facil = 1, "Facil"
    intermediario = 2, "Intermediario"
    Mindfulness = 3, "Dificil"
