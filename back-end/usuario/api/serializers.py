from rest_framework import serializers
from usuario.models import Usuario
from django.contrib.auth.password_validation import validate_password

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'nome', 'cpf', 'is_active', 'altera_senha']

class CadastroUsuarioSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'nome', 'cpf', 'altera_senha', 'password', 'password2']
        extra_kwargs = { 'password': {'write_only': True} }

    def save(self):
        usuario = Usuario(email=self.validated_data['email'], nome=self.validated_data['nome'], cpf=self.validated_data['cpf'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Senhas são diferentes.'})
        
        usuario.set_password(password)
        usuario.save()
         
        return usuario

class AlteraSenhaSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = Usuario
        fields = ('password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "As senhas são diferentes."})

        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

        return instance