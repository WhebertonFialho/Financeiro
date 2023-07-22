import uuid
from django.db import models

from tabela.models import Banco
from usuario.models import Usuario

class ContaBancaria(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, db_column='cod_conta_bancaria')
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, db_column='cod_usuario')
    banco = models.ForeignKey(Banco, on_delete=models.PROTECT, db_column='cod_banco')
    descricao = models.CharField(max_length=70)
    agencia = models.CharField(max_length=15)
    nro_conta = models.CharField(max_length=15)
    valor_inicial = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Conta Bancaria'
        verbose_name_plural = 'Contas Bancarias'
        db_table = 'cad_conta_bancaria'