# Generated by Django 4.2 on 2023-07-22 00:01

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tabela', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContaBancaria',
            fields=[
                ('codigo', models.UUIDField(db_column='cod_conta_bancaria', default=uuid.uuid4, primary_key=True, serialize=False)),
                ('descricao', models.CharField(max_length=70)),
                ('agencia', models.CharField(max_length=15)),
                ('nr_conta', models.CharField(max_length=15)),
                ('valor_inicial', models.DecimalField(decimal_places=2, max_digits=10)),
                ('banco', models.ForeignKey(db_column='cod_banco', on_delete=django.db.models.deletion.DO_NOTHING, to='tabela.banco')),
            ],
            options={
                'verbose_name': 'Conta Bancaria',
                'verbose_name_plural': 'Contas Bancarias',
                'db_table': 'cad_conta_bancaria',
            },
        ),
    ]
