from rest_framework.serializers import ModelSerializer
from tabela.models import *

class TipoLancamentoSerializer(ModelSerializer):
    class Meta:
        model = TipoLancamento
        fields =  '__all__'