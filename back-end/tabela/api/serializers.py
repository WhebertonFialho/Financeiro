from rest_framework.serializers import ModelSerializer
from tabela.models import *

class BancoSerializer(ModelSerializer):
    class Meta:
        model = Banco
        fields = '__all__'

class TipoCartaoSerializer(ModelSerializer):
    class Meta:
        model = TipoCartao
        fields =  '__all__'

class TipoLancamentoSerializer(ModelSerializer):
    class Meta:
        model = TipoLancamento
        fields =  '__all__'