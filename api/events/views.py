from rest_framework import generics
from .models import Event
from .serializers import EventSerializer


class ListEvent(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class DetailEvent(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
