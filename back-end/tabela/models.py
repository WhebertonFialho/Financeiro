from django.db import models

class Banco(models.Model):
    codigo = models.CharField(max_length=5, primary_key=True, db_column='cod_banco')
    descricao = models.CharField(max_length=100)
    
    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Banco'
        verbose_name_plural = 'Bancos'
        db_table = 'tab_banco'
   
class TipoCartao(models.Model):
    codigo = models.CharField(primary_key=True, max_length=1, db_column='cod_tipo_cartao')
    descricao = models.CharField(max_length=50)
    
    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Tipo Cartão'
        verbose_name_plural = 'Tipos Cartão'
        db_table = 'tab_tipo_cartao'

class TipoLancamento(models.Model):
    codigo = models.CharField(primary_key=True, max_length=1, db_column='cod_tipo_lancamento')
    descricao = models.CharField(max_length=50)
    
    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name = 'Tipo Lançamento'
        verbose_name_plural = 'Tipos lançamento'
        db_table = 'tab_tipo_lancamento'