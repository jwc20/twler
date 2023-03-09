from django.db import models

from events.models import Event 
# from eventcompetitors.models import EventCompetitor

class Athlete(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    nation = models.CharField(max_length=100)
    birth_date = models.DateField()
    # profile_picture = models.ImageField(upload_to='athlete_profile_pics/')
    # results = models.JSONField()

    # Relationships
    events = models.ManyToManyField(Event, through="eventcompetitors.EventCompetitor")

    def __str__(self):
        return self.last_name + ", " + self.first_name
