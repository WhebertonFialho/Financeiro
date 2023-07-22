from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from lancamento.models import Lancamento
from .serializers import LancamentoSerializer

class LancamentoViewSet(ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    queryset = Lancamento.objects.all()
    serializer_class = LancamentoSerializer
    filterset_fields = ['codigo', 'descricao', 'usuario']