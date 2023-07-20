
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from tabela.api.viewsets import *

router = routers.DefaultRouter()
router.register(r'tipo_lancamento', TipoLancamentoViewSet, basename='TipoLancamento')

urlpatterns = [ 
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
