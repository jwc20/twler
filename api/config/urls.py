from django.contrib import admin
from django.urls import path, include

from .custom_views import get_ipfs_data

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/events/", include("events.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("api/dj-rest-auth/", include("dj_rest_auth.urls")),
    path("api/dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("ipfs/<str:cid>/", get_ipfs_data, name="get_ipfs_data"),
]
