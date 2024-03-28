from rest_framework import serializers
from . import models

class UserInfoSerializer(serializers.ModelSerializer):
    def checking():
        print("hello")
    class Meta:
        model = models.UserInformation
        fields = ['userID','age','currentWeight','gender','height','motive','activitylevel','targetWeight','bmr','tdee']
    
class WorkoutDairySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WorkoutDairy
        fields = ['date' , 'workout']

class MealDairySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MealDairy
        fields = ['date' , 'meal']

class WorkoutDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Workout_Data
        fields = '__all__'

class limitWorkoutDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Workout_Data
        fields = ['name', 'image_url', 'level',]

class RecipeSerializer(serializers.ModelSerializer):
    directions = serializers.ListField()
    ingredients = serializers.ListField()
    class Meta:
        model = models.Recipe_Data
        fields = '__all__'

class limitRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recipe_Data
        fields = ['title' , 'image' , 'calories_per_serving','id']

class YogaAsanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.YogaAsana_data
        fields = '__all__'

class limitYogaAsanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.YogaAsana_data
        fields = ['name' , 'image','id']

class MeditationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MeditationTechnique_data
        fields = '__all__'

class limitMeditationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MeditationTechnique_data
        fields = ['name' , 'image' ,'id']
