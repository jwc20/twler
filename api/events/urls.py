from django.urls import include, path
from .views import ListEvent, DetailEvent


urlpatterns = [
    path("<int:pk>/", DetailEvent.as_view()),
    path("", ListEvent.as_view()),
]
