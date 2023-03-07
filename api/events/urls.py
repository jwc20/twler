from django.urls import path
from .views import ListEvent, DetailEvent


urlpatterns = [
    path("<int:pk>/", DetailEvent.as_view()),
    path("", ListEvent.as_view()),
]
