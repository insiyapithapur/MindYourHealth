import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from djongo import models 

class UserManager(BaseUserManager):
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        user = self.model(
            email=email,
            username=username,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password=password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, blank=True, null=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UserInformation(models.Model):
    userID         = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userID')
    age            = models.IntegerField()
    currentWeight  = models.CharField(max_length=6)
    gender         = models.CharField(max_length = 7)
    height         = models.CharField(max_length=10)
    motive         = models.CharField(max_length = 30)
    activitylevel  = models.CharField(max_length = 30)
    targetWeight   = models.CharField(max_length=6)
    
    bmr = models.FloatField(null=False, blank=False)
    tdee = models.FloatField(null=False, blank=False)
    
class WorkoutDairy(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    workout = models.JSONField(default=list)

    def __str__(self):
        return str(str(self.userID) + " "+str(self.date))
    
class MealDairy(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    breakfast = models.JSONField(default=list)
    lunch = models.JSONField(default=list)
    snack = models.JSONField(default=list)
    dinner = models.JSONField(default=list)

    def __str__(self):
        return str(str(self.userID) + " "+str(self.date))

class HabitTracker(models.Model):
  userID = models.ForeignKey(User, on_delete=models.CASCADE)
  date = models.DateField()
  Steps = models.IntegerField()    #no of steps
  SleepTime = models.IntegerField()  #in mins
  Water = models.FloatField() #in lits
  Weight = models.FloatField() #in kgs

class MenstrualCycle(models.Model):
  userID = models.ForeignKey(User, on_delete=models.CASCADE)
  startdate = models.DateField()
  enddate = models.DateField()

class CalorieManagement(models.Model):
  UserID = models.ForeignKey(User, on_delete=models.CASCADE)
  date = models.DateField()
  calIntake = models.FloatField()
  calBurned = models.FloatField()




class FoodItems(models.Model):
    food_item = models.CharField(max_length=100)
    portion_size = models.CharField(max_length=50)
    calorie = models.IntegerField()

    def __str__(self):
        return self.food_item
    
class Workout_Data(models.Model):
    name = models.CharField(max_length=100)
    force = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    mechanic = models.CharField(max_length=100,null=True)
    equipment = models.CharField(max_length=100,null=True)
    primary_muscles = models.JSONField(default=list)
    secondary_muscles = models.JSONField(default=list)
    instructions = models.JSONField(default=list)
    category = models.CharField(max_length=100)
    image_url = models.URLField(max_length=2000)
 
    def __str__(self):
        return self.name
    
class Recipe_Data(models.Model):
    title = models.CharField(max_length=255)
    directions = models.JSONField(default=list)
    ingredients = models.JSONField(default=list)
    language = models.CharField(max_length=20)
    source = models.CharField(max_length=255)
    url = models.URLField()
    image = models.URLField(max_length=1000)
    calories_per_serving = models.IntegerField()

    def __str__(self):
        return self.title
    
class YogaAsana_data(models.Model):
    name = models.CharField(max_length=100)
    steps = models.JSONField()
    image = models.CharField(max_length=1000)
    benefits = models.JSONField()
    limitations = models.JSONField()

    def __str__(self):
        return self.name
    
class MeditationTechnique_data(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    benefits = models.JSONField()
    steps = models.JSONField()
    image = models.CharField(max_length=1000)

    def __str__(self):
        return self.name