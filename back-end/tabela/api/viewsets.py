from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication

from tabela.models import *
from .serializers import *

class TipoLancamentoViewSet(ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = TipoLancamento.objects.all()
    serializer_class = TipoLancamentoSerializer
    filterset_fields = ['codigo', 'descricao']
