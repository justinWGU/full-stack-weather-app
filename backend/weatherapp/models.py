from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class FavCities(models.Model):
    city_name = models.CharField(max_length=100, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cities")
