from django.contrib.auth.models import User
from rest_framework import generics, permissions

from .permissions import IsUserOrAdmin
from .serializers import UserSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [IsUserOrAdmin]
    queryset = User.objects.all()
    serializer_class = UserSerializer
