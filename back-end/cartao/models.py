import uuid
from django.db import models

from conta_bancaria.models import ContaBancaria
from tabela.models import BandeiraCartao, TipoCartao
from usuario.models import Usuario

class Cartao(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, db_column='cod_cartao')
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, db_column='cod_usuario')
    conta_bancaria = models.ForeignKey(ContaBancaria, on_delete=models.PROTECT, db_column='cod_conta_bancaria')
    bandeira_cartao = models.ForeignKey(BandeiraCartao, on_delete=models.PROTECT, db_column='cod_bandeira_cartao')
    tipo_cartao = models.ForeignKey(TipoCartao, on_delete=models.PROTECT, db_column='cod_tipo_cartao')
    descricao = models.CharField(max_length=70)
    nro_cartao = models.CharField(max_length=20)
    validade = models.CharField(max_length=5)
    cvc = models.CharField(max_length=3)

    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Cartão'
        verbose_name_plural = 'Cartãos'
        db_table = 'cad_cartao'