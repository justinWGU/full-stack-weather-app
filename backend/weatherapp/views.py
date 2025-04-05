import http
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import utils
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
    print("token: ", token)

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
        print("City: ", city)
        print("City type: ", type(city))

        if city is not None and len(city) > 0:
            # add given city to user's city list
            user.cities.create(city_name=city)
            user.save()
        else:
            raise ValueError("City cannot be empty.")

    except Token.DoesNotExist as t:
        return Response(data={"response": f"No token with given key found. {t}"},
                        status=status.HTTP_400_BAD_REQUEST)
    except ValueError as v:
        return Response(data={"response": f"{v}"}, status=status.HTTP_400_BAD_REQUEST)
    except utils.IntegrityError:
        return Response(data={"response": f"Cannot add duplicate cities."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(data={"response": f"Unknown error occurred."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # return list of user's fav cities
    cities = user.cities.all()
    serializer = serializers.FavCitiesSerializer(cities, many=True)
    return Response(data={"cities": serializer.data}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_city(request):
    # find user using token
    full_token = request.headers.get("Authorization")
    token = full_token.split(" ")[1]

    try:
        user = Token.objects.get(key=token).user
        city = request.data.get("city")
        city = user.cities.get(city_name=city) # react won't have del button for non-favored cities.
        city.delete()
        user.save()

    except Token.DoesNotExist as t:
        return Response(data={"response": f"No token with given key found. {t}"},
                        status=status.HTTP_400_BAD_REQUEST)
    except FavCities.DoesNotExist as f:
        return Response(data={"response": f"No user found with given token. {f}"},
                        status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(data={"response": f"Unknown error occurred."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # return list of user's fav cities
    cities = user.cities.all()
    serializer = serializers.FavCitiesSerializer(cities, many=True)
    return Response(data={"cities": serializer.data}, status=status.HTTP_200_OK)



