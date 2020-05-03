from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserViewSet

router = DefaultRouter()
router.register('user', UserViewSet, 'user')

urlpatterns = [
    # Tokens
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Other
    path(r'', include(router.urls)),

    # Testing
    path('api-auth/', include('rest_framework.urls')),
]
