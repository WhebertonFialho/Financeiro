import uuid
from django.db import models

from categoria.models import Categoria
from conta_bancaria.models import ContaBancaria
from tabela.models import TipoLancamento
from usuario.models import Usuario

class Lancamento(models.Model):
    codigo = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, db_column='cod_lancamento')
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, db_column='cod_usuario')
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, db_column='cod_categoria')
    tipo_lancamento = models.ForeignKey(TipoLancamento, on_delete=models.PROTECT, db_column='cod_tipo_lancamento')
    conta_bancaria = models.ForeignKey(ContaBancaria, on_delete=models.PROTECT, db_column='cod_conta_bancaria')
    descricao = models.CharField(max_length=100)
    valor = models.DecimalField(max_digits=12, decimal_places=2)
    data = models.DateField(auto_now=False, auto_now_add=False)
    
    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Lancamento'
        verbose_name_plural = 'Lancamentos'
        db_table = 'cad_lancamento'