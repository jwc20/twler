from django.db import models


from events.models import Event
from athletes.models import Athlete

# from results.models import Result


class EventCompetitor(models.Model):
    body_weight = models.FloatField()
    weight_category = models.IntegerField()
    group = models.CharField(max_length=255)

    athlete = models.ForeignKey(Athlete, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    # result = models.ForeignKey(Result, on_delete=models)

    # def __str__(self):
    #     return

    class Meta:
        unique_together = ("event", "athlete")
