from django.db import models
from events.models import Event
from athletes.models import Athlete


class EventCompetitor(models.Model):
    athlete = models.OneToOneField(Athlete, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    body_weight = models.FloatField()
    weight_category = models.IntegerField()
    group = models.CharField(max_length=255)
    snatch1 = models.FloatField()
    snatch2 = models.FloatField()
    snatch3 = models.FloatField()
    snatch = models.FloatField()
    jerk1 = models.FloatField()
    jerk2 = models.FloatField()
    jerk3 = models.FloatField()
    jerk = models.FloatField()
    total = models.FloatField()
    rank_snatch = models.IntegerField()
    rank_jerk = models.IntegerField()
    rank = models.IntegerField()
    medal = models.CharField(max_length=255)

    # def __str__(self):
    #     return
