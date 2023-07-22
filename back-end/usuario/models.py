from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
import uuid

class UsuarioManager(BaseUserManager):
    def create_user(self, email, nome, cpf, password, **extra_fields):
        if not email:
            raise ValueError('Username é Obrigatório')

        usuario = self.model(email=email, nome=nome, cpf=cpf, **extra_fields)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, email, nome, cpf, password, **extra_fields):
        usuario = self.create_user(email=email, nome=nome, cpf=cpf, password=password, **extra_fields)
        usuario.is_admin = True
        usuario.is_superuser = True
        usuario.save(using=self._db)
        return usuario

class Usuario(AbstractBaseUser):
    codigo = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, db_column='cod_usuario')
    username = None
    email = models.CharField(max_length=150, unique=True)
    nome = models.CharField(max_length=100, verbose_name='Nome Completo')
    cpf = models.CharField(max_length=14, verbose_name='CPF')
    is_active = models.BooleanField(default=True, verbose_name='Ativo?')
    is_admin = models.BooleanField(default=False, verbose_name='Administrador?')
    altera_senha = models.BooleanField(default=True, verbose_name='Altera Senha Proximo Login?')
    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'cpf']

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
        db_table = 'cad_usuario'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True