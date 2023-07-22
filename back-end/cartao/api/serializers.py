from rest_framework.serializers import ModelSerializer
from cartao.models import Cartao

class CartaoSerializer(ModelSerializer):
    class Meta:
        model = Cartao
        fields =  '__all__'