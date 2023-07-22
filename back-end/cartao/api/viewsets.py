from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from cartao.models import Cartao
from .serializers import CartaoSerializer

class CartaoViewSet(ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    queryset = Cartao.objects.all()
    serializer_class = CartaoSerializer
    filterset_fields = ['codigo', 'descricao', 'usuario']