# from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
# from .serializers import UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = get_user_model().objects,all() 
#     serializer_class = UserSerializer

