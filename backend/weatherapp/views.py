import http

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from . import serializers
from .models import User, FavCities


# Create your views here.
@api_view(["GET"])
def user_view(request):

    data = {"response": "response from user_view"}
    return Response(data=data, status=http.HTTPStatus(200))

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def privileged_view(request):
    return Response(data={"response": "You've accessed a privileged view."}, status=http.HTTPStatus(200))

@api_view(["POST"])
def signup(request):
    data = request.data
    serializer = serializers.UserSerializer(data=data)

    if serializer.is_valid():
        user = serializer.save()
        data = {"message": f"Successfully added {user.username}"}
        return Response(data=data, status=http.HTTPStatus(200))
    else:
        return Response(data=serializer.errors, status=http.HTTPStatus(401))



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cities(request):

    # remove the prepended 'Token' word form the whole token
    full_token = request.headers.get("Authorization")
    token = full_token.split(" ")[1]

    user = Token.objects.get(key=token).user
    cities = user.cities.all()
    serializer = serializers.FavCitiesSerializer(cities, many=True)
    return Response(data={"cities": serializer.data}, status=http.HTTPStatus(200))




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_city(request):
     # get user with given TOken, add city to list, & return new list
    full_token = request.headers.get("Authorization")
    token = full_token.split(" ")[1]
    try:
        user = Token.objects.get(key=token).user
        city = request.data.get("city")

        if city is not None:
            # add given city to user's city list
            user.cities.create(city_name=city)
            user.save()
    except Token.DoesNotExist:
        return Response(data={"response": "No user found with given token."})

    # return list of user's fav cities
    cities = user.cities.all()
    serializer = serializers.FavCitiesSerializer(cities, many=True)
    return Response(data={"cities": serializer.data})



