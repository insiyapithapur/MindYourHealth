# Generated by Django 4.1.13 on 2024-03-24 00:55

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0002_yogaasana_data_alter_recipe_data_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='MeditationTechnique_data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('benefits', djongo.models.fields.JSONField()),
                ('steps', djongo.models.fields.JSONField()),
                ('image', models.CharField(max_length=1000)),
            ],
        ),
        migrations.AlterField(
            model_name='yogaasana_data',
            name='image',
            field=models.CharField(max_length=1000),
        ),
    ]