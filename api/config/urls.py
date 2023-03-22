from django.contrib import admin
from django.urls import path, include

# from .views import example_get_ipfs_data
from .views import get_ipfs_data



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/events/", include("events.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("api/dj-rest-auth/", include("dj_rest_auth.urls")),
    path("api/dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    # path("results/", include("results.urls")),
    # path("api/example-ipfs-json/", example_get_ipfs_data, name="example-ipfs-json"),
    path("api/ipfs/<str:cid>/", get_ipfs_data, name="ipfs-json"),
]
