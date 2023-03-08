from django.db import models


class Athlete(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    nation = models.CharField(max_length=255)
    birth_date = models.DateField()
    results = models.JSONField()

    def __str__(self):
        return self.last_name + ", " + self.first_name
