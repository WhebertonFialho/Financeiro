from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from categoria.models import Categoria
from .serializers import CategoriaSerializer

class CategoriaViewSet(ModelViewSet):
    #permission_classes = (IsAuthenticated,)
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    filterset_fields = ['codigo', 'descricao']