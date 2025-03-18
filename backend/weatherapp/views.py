import http

from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(["GET"])
def user_view(request):

    data = {"response": "response from user_view"}
    return Response(data=data, status=http.HTTPStatus(200))


