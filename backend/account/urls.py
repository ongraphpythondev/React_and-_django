from account.views import  MyTokenObtainPairView, Registration
from django.urls import path

urlpatterns = [
    path('registration', Registration.as_view()) ,
    path('generate_token', MyTokenObtainPairView.as_view()) ,
]
