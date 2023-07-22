from rest_framework.serializers import ModelSerializer
from lancamento.models import Lancamento

class LancamentoSerializer(ModelSerializer):
    class Meta:
        model = Lancamento
        fields =  '__all__'