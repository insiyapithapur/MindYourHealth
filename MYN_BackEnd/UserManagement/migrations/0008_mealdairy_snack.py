# Generated by Django 4.1.13 on 2024-03-11 04:43

from django.db import migrations
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0007_remove_mealdairy_meal_mealdairy_breakfast_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mealdairy',
            name='snack',
            field=djongo.models.fields.JSONField(default=list),
        ),
    ]