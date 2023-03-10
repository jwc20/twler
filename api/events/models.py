from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    date = models.DateField()
    event_url = models.URLField(max_length=255)

    def __str__(self):
        return self.name
