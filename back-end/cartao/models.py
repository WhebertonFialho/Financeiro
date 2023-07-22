import uuid
from django.db import models

class Cartao(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, db_column='cod_cartao')
    descricao = models.CharField(max_length=70)
    nro_cartao = models.CharField(max_length=20)
    validade = models.CharField(max_length=5)
    cvc = models.DecimalField(decimal_places=3)

    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Cartão'
        verbose_name_plural = 'Cartãos'
        db_table = 'cad_cartao'