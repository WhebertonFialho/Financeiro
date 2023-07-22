# Generated by Django 4.2 on 2023-07-22 02:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('codigo', models.UUIDField(db_column='cod_categoria', default=uuid.uuid4, primary_key=True, serialize=False)),
                ('descricao', models.CharField(max_length=70)),
                ('usuario', models.ForeignKey(db_column='cod_usuario', on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Categoria',
                'verbose_name_plural': 'Categiorias',
                'db_table': 'cad_categoria',
            },
        ),
    ]
