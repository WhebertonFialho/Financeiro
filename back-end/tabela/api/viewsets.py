from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication

from tabela.models import *
from .serializers import *

class BancoViewSet(ModelViewSet):
    #authentication_classes = (TokenAuthentication,)
    queryset = Banco.objects.all()
    serializer_class = BancoSerializer
    filterset_fields = ['codigo', 'descricao']

class TipoCartaoViewSet(ModelViewSet):
    #authentication_classes = (TokenAuthentication,)
    queryset = TipoCartao.objects.all()
    serializer_class = TipoCartaoSerializer
    filterset_fields = ['codigo', 'descricao']


class TipoLancamentoViewSet(ModelViewSet):
    #authentication_classes = (TokenAuthentication,)
    queryset = TipoLancamento.objects.all()
    serializer_class = TipoLancamentoSerializer
    filterset_fields = ['codigo', 'descricao']
