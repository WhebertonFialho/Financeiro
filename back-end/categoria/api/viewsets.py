from rest_framework.viewsets import ModelViewSet
from sqls.models import SQL, ParametroSQL, SQLParametro
from .serializers import SQLSerializer, ParametroSQLSerializer, SQLParametroSerializer
from rest_framework.permissions import IsAuthenticated

class SQLViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = SQL.objects.all()
    serializer_class = SQLSerializer
    filterset_fields = ['codigo', 'descricao', 'sql']