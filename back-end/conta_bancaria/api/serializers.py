from rest_framework.serializers import ModelSerializer
from conta_bancaria.models import ContaBancaria

class ContaBancariaSerializer(ModelSerializer):
    class Meta:
        model = ContaBancaria
        fields =  '__all__'