
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from cartao.api.viewsets import CartaoViewSet
from categoria.api.viewsets import CategoriaViewSet
from conta_bancaria.api.viewsets import ContaBancariaViewSet
from lancamento.api.viewsets import LancamentoViewSet
from tabela.api.viewsets import *
from usuario.api.viewsets import *

router = routers.DefaultRouter()
router.register(r'banco', BancoViewSet, basename='Banco')
router.register(r'bandeira_cartao', BandeiraCartaoViewSet, basename='BandeiraCartao')
router.register(r'cartao', CartaoViewSet, basename='Cartao')
router.register(r'categoria', CategoriaViewSet, basename='Categoria')
router.register(r'conta_bancaria', ContaBancariaViewSet, basename='ContaBancaria')
router.register(r'lancamento', LancamentoViewSet, basename='Lancamento')
router.register(r'tipo_cartao', TipoCartaoViewSet, basename='TipoCartao')
router.register(r'tipo_lancamento', TipoLancamentoViewSet, basename='TipoLancamento')
router.register(r'auth/usuario', UsuariosViewSet, basename='Usuarios')

urlpatterns = [ 
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/login', LoginViewSet.as_view(), name='Login'),
    path('auth/usuario', CadastroUsuarioViewSet.as_view(), name='Registrar'),
    path('auth/alterarSenha/<uuid:pk>/', AlterarSenhaViewSet.as_view(), name='AlterarSenha')
]