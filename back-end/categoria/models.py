import uuid
from django.db import models

from usuario.models import Usuario

class Categoria(models.Model):
    codigo = models.UUIDField(primary_key=True, default=uuid.uuid4, db_column='cod_categoria')
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, db_column='cod_usuario')
    descricao = models.CharField(max_length=70)

    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categiorias'
        db_table = 'cad_categoria'