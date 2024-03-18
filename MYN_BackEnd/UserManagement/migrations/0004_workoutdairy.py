# Generated by Django 4.1.13 on 2024-02-10 05:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0003_fooditems'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkoutDairy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('workoutname', models.CharField(max_length=100)),
                ('measure', models.CharField(max_length=100)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
