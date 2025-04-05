from . import views
from django.urls import path
from rest_framework.authtoken import views as drf_views

urlpatterns = [
    path("test/", views.user_view),
    path("signin/", drf_views.obtain_auth_token, name="signin"), # credentials are authed in exchange for a token
    path("privileged/", views.privileged_view),
    path("signup/", views.signup),
    path("get-cities/", views.get_cities),
    path("add-city/", views.add_city),
    path("remove-city/", views.remove_city)
]