from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import EventViewSet
# from .views import UserViewSet


router = SimpleRouter()
# router.register('users', UserViewSet, basename='users')
router.register("", EventViewSet, basename="events")

urlpatterns = router.urls
