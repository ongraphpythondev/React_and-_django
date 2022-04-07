from urllib import response
from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView
from account.searializers import MyTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from account.searializers import RegistrationSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import jwt
from django.contrib.auth.models import User


class Registration(APIView):
    def get(self, request):
        return Response({"data": " get is succesfully"})

    @csrf_exempt
    def post(self , request):
        serializer = RegistrationSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data, "error":"none"}, status=status.HTTP_201_CREATED)

        return Response({"error":serializer.errors})


class Profile(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        data = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.filter(username = data["username"]).first()
        if user is not None:
            return Response({"data": user.username})
        else:
            return Response({"data": "user not found"})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer