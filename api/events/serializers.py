from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.Serializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "location",
            "date",
            "event_url",
        )
