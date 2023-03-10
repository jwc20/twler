from django.contrib.auth import get_user_model
from django.db import models
from events.models import Event 


class Bookmark(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user + ": " + self.timestamp
