from account.views import  MyTokenObtainPairView, Registration, Profile
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('registration', Registration.as_view()) ,
    path('generate_token', MyTokenObtainPairView.as_view()) ,
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile', Profile.as_view(), name='profile'),
]
