from django.contrib import admin
from .models import *

admin.site.register(Banco)
admin.site.register(BandeiraCartao)
admin.site.register(TipoCartao)
admin.site.register(TipoLancamento)