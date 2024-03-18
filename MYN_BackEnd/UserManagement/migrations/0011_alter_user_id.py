# Generated by Django 4.1.13 on 2024-03-13 11:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0010_alter_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=100, primary_key=True, serialize=False),
        ),
    ]
