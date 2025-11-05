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


class DiaryMoodChoices(models.TextChoices):
    EXCELENTE = "Excelente", "Excelente"
    BOM = "Bom", "Bom"
    NEUTRO = "Neutro", "Neutro"
    RUIM = "Ruim", "Ruim"
    PESSIMO = "Péssimo", "Péssimo"


class ObjectivePeriodChoices(models.TextChoices):
    ONE_WEEK = "1w", "1 semana"
    TWO_WEEKS = "2w", "2 semanas"
    THREE_WEEKS = "3w", "3 semanas"


class ObjectiveRepeatChoices(models.TextChoices):
    ONE_TIME = "1x", "1 Vez"
    THREE_TIMES = "3x", "2 Vezes"
    FIVE_TIMES = "5x", "3 Vezes"


class ExerciseTypeChoices(models.TextChoices):
    FORCA = "Força", "Força"
    FLEXIBILIDADE = "Flexibilidade", "Flexibilidade"
    AEROBICO = "Aeróbico", "Aeróbico"
    RESISTENCIA = "Resistência", "Resistência"


class MindfulnessTypeChoices(models.TextChoices):
    RESPIRACAO_CONSCIENTE = "Respiração Consciente", "Respiração Consciente"
    MEDITACAO_MINDFULNESS = "Meditação Mindfulness", "Meditação Mindfulness"
    CONSCIENCIA_EMOCIONAL = "Consciência Emocional", "Consciência Emocional"
    ATIVIDADES_COTIDIANAS = "Atenção nas Atividades", "Atenção nas Atividades"
