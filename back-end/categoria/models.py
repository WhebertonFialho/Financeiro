from django.db import models
import uuid

class Categoria(models.Model):
    codigo = models.UUIDField(primary_key=True, db_column='id_categoria', default=uuid.uuid4)
    descricao = models.CharField(max_length=70)

    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categiorias'
        db_table = 'cad_categoria'