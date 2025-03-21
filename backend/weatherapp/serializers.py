import django.db.utils
from rest_framework.serializers import ModelSerializer
from .models import User, FavCities


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]
    def create(self, validated_data):

        username = validated_data.get("username")
        password = validated_data.pop("password")
        # handles when user exists
        user = User.objects.create_user (
            username=username,
        )

        user.set_password(password)
        user.save()

        return user

class FavCitiesSerializer(ModelSerializer):
    class Meta:
        model = FavCities
        fields = ["id", "city_name"]