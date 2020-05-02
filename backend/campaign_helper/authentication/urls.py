from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserDetail

urlpatterns = [
    # Tokens
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Other
    path('user/<int:pk>/', UserDetail.as_view()),

    # Testing
    path('api-auth/', include('rest_framework.urls')),
]
