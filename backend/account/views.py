from urllib import response
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from account.searializers import MyTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from account.searializers import RegistrationSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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
        

class MyTokenObtainPairView(TokenObtainPairView):
    # @csrf_exempt
    # def post(self , request):
    #     name = request.data["username"]
    #     password = request.data["password"]
    #     user = authenticate(username=name, password=password)
    #     serializer = MyTokenObtainPairSerializer(data = request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({"data":serializer.data, "error":"none"}, status=status.HTTP_201_CREATED)

    #     return Response({"error":serializer.errors})
    serializer_class = MyTokenObtainPairSerializer