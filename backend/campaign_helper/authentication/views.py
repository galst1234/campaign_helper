from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .permissions import IsUser
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.detail and not self.action == 'retrieve':
            return [(IsUser | permissions.IsAdminUser)()]
        return [permissions.AllowAny()]

    @action(detail=False)
    def my_info(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
