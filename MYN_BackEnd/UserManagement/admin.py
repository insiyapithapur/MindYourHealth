from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.UserInformation)
admin.site.register(models.FoodItems)
admin.site.register(models.WorkoutDairy)
admin.site.register(models.MealDairy)
admin.site.register(models.CalorieManagement)
admin.site.register(models.HabitTracker)
admin.site.register(models.MenstrualCycle)
admin.site.register(models.Workout_Data)
admin.site.register(models.Recipe_Data)
admin.site.register(models.YogaAsana_data)
admin.site.register(models.MeditationTechnique_data)