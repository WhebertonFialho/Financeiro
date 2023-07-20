from django.db import models

class TipoLancamento(models.Model):
    codigo = models.CharField(primary_key=True, max_length=1,db_column='id_tipo_lancamento')
    descricao = models.CharField(max_length=50)
    
    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Tipo Lançamento'
        verbose_name_plural = 'Tipos lançamento'
        db_table = 'tab_tipo_lancamento'