from django.db import models


from eventcompetitors.models import EventCompetitor
from events.models import Event
from athletes.models import Athlete

# Create your models here.
class Result(models.Model):
    # Snatch
    snatch1 = models.FloatField()
    snatch2 = models.FloatField()
    snatch3 = models.FloatField()
    snatch = models.FloatField()
    rank_snatch = models.IntegerField()

    # Clean and Jerk
    jerk1 = models.FloatField()
    jerk2 = models.FloatField()
    jerk3 = models.FloatField()
    jerk = models.FloatField()
    rank_jerk = models.IntegerField()

    # Total
    total = models.FloatField()
    rank = models.IntegerField()
    medal = models.CharField(max_length=255)

    # Note
    note = models.TextField(blank=True)

    # Relationship
    event_competitor = models.ForeignKey(EventCompetitor, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
