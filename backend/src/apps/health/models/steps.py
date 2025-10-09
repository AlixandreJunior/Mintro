from django.conf import settings
from django.db import models


class StepLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="step_logs"
    )
    date = models.DateField(auto_now_add=True)
    steps = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.user.username} - {self.date} - {self.steps} steps"
