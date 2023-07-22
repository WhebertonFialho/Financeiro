from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from conta_bancaria.models import ContaBancaria
from .serializers import ContaBancariaSerializer

class ContaBancariaViewSet(ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    queryset = ContaBancaria.objects.all()
    serializer_class = ContaBancariaSerializer
    filterset_fields = ['codigo', 'descricao', 'banco', 'usuario']