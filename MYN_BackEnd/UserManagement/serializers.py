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