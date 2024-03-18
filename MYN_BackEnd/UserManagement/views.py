from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from UserManagement import serializers
from . import models , serializers
from django.contrib.auth import authenticate
import pandas as pd
from datetime import datetime, timedelta, timezone
from django.core.paginator import Paginator

class UserSignUpAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        username = request.data.get('username')

        try:
            # Use get query to retrieve a single document or raise a DoesNotExist exception
            existing_user = models.User.objects.get(email= email)
            return Response({"message": "Email already exists"}, status=401)
        except models.User.DoesNotExist:
            try:
                # Use create_user or create method based on your implementation
                user = models.User.objects.create_user(email=email, password=password, username=username)
                user.save()
                generated_id = user.id  
                print(generated_id)
                username = models.User.objects.get(id = user.id)
                saved_username = user.username
                print(user.username)
                return Response({"message": "User Registered" , "userId" : generated_id,"username":saved_username}, status=200)
            except IntegrityError as e:
                return Response({"message": "User not Registered. Error: {}".format(str(e))}, status=500)
            
class UserLoginAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_exists = models.User.objects.get(email=email)
            
            if user_exists != None :
                user = authenticate(request, email=email, password=password)

                if user is not None:
                    user_id = user.id
                    username = user.username
                    return Response({"message": "Successfully Login", "user_id": user_id,"username":username}, status=200)
                else:
                    return Response({"message": "Invalid email or password"}, status=400)
            # else :
            #     Response({"message" : "Email doesn't exist please register"} , status=400)
        except Exception as e:
            # database-related errors
            return Response({"message": "Email doesn't exist please register"}, status=500)

# class UserInformationAPIView(APIView):
#     authentication_classes = []
#     permission_classes = [AllowAny]
#     def post(self, request):
#         data = JSONParser().parse(request)
#         try:
#             print(data['userID'])
#             user_instance = models.User.objects.filter(id=data['userID'])
#             print("user_instance",user_instance)
#             print("user_id",user_instance)
#             print("data",data)
#             serializer = serializers.UserInfoSerializer(data=data)
#             print(serializer.is_valid(raise_exception=True))
#             if serializer.is_valid(raise_exception=True):
#                 print("in if")
#                 instance = serializer.save()
#                 option = instance.motive
#                 print(option)
#                 if option == "Lose Weight":
#                     TDEE = instance.tdee
#                     calorieinstakeperday = TDEE - 500
#                 elif option == "Gain Weight":
#                     TDEE = instance.tdee
#                     calorieinstakeperday = TDEE + 500
#                 elif option == "Maintain Weight":
#                     TDEE = instance.tdee
#                     calorieinstakeperday = TDEE 
#                 HabitTrackerEntery = models.HabitTracker.objects.create(userID = user_instance, date=data['date'],Weight=data['weight'])
#                 HabitTrackerEntery.save()
#                 return Response({"Calorie intake per day should be " : calorieinstakeperday},status=200)
#             else:
#                     return Response({"serializer.errors":serializer.errors}, status=400)
#         except:
#             return Response({"message":"User doesn't exist try to login or SignUp again"},status=400)
class UserInformationAPIView(APIView):
    def post(self, request):
        data = request.data

        # Validate the incoming data
        serializer = serializers.UserInfoSerializer(data=data)
        if serializer.is_valid():
            # Retrieve the user instance
            user_instance = get_object_or_404(models.User, id=data['userID'])
            
            # Create and save UserInformation instance
            user_info_instance = models.UserInformation.objects.create(
                userID=user_instance,
                age=int(data['age']),
                currentWeight=float(data['currentWeight'].split()[0]),  # Extracting weight value
                gender=data['gender'],
                height=float(data['height'].split()[0]),
                motive=data['motive'],
                activitylevel=data['activitylevel'],
                targetWeight=float(data['targetWeight'].split()[0]),  # Extracting weight value
                tdee = data['tdee'],
                bmr = data['bmr']
            )
            # Calculate calorie intake per day based on motive
            option = user_info_instance.motive
            if option == "Lose Weight":
                print(user_info_instance.tdee)
                calorie_intake_per_day = user_info_instance.tdee - 500
            elif option == "Gain Weight":
                calorie_intake_per_day = user_info_instance.tdee + 500
            else:  # Maintain Weight
                calorie_intake_per_day = user_info_instance.tdee
            return Response({"Calorie intake per day should be": calorie_intake_per_day}, status=200)
        else:
            return Response(serializer.errors, status=400)
        
    # def patch(self, request):
    #     user_id = request.data.get("user_id")
    #     user_info_instance = models.UserInformation.objects.filter(userID=user_id).first()
        
    #     if not user_info_instance:
    #         return Response({'error': 'UserInformation not found'}, status=404)
        
    #     # The partial=True argument in the serializer's instantiation allows partial 
    #     # updates, meaning that only the specified fields will be updated.
    #     serializer = serializers.UserInfoSerializer(user_info_instance, data=request.data, partial=True)

    #     if serializer.is_valid():
    #         instance = serializer.save()
            
    #         return Response({'message': 'UserInformation updated successfully'} , status = 200)
    #     else:
    #         return Response({"message" : serializer.errors}, status=400)
        

class GetUserInfoAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self,request,userID):
        print(userID)
        user = models.User.objects.get(id = userID)
        print(user)
        userinfo = models.UserInformation.objects.get(userID=userID)
        print(userinfo)
        userinfoObj = {
            'username'     : user.username,
            'email'        : user.email ,
            'age'          : userinfo.age ,
            'height'       : userinfo.height ,
            'gender'       : userinfo.gender ,
            'currentWeight': userinfo.currentWeight ,
            'goal'       : userinfo.motive ,
            'targetWeight' : userinfo.targetWeight,
            'activitylevel': userinfo.activitylevel
        }
        return Response({"User Information" : userinfoObj}, status=200)
    
class UpdateUserInformationAPIView(APIView):
    def patch(self, request, user_id):
        user_info_instance = models.UserInformation.objects.filter(userID=user_id).first()
        
        if not user_info_instance:
            return Response({'error': 'UserInformation not found'}, status=404)
        
        # The partial=True argument in the serializer's instantiation allows partial 
        # updates, meaning that only the specified fields will be updated.
        print(request.data)
        serializer = serializers.UserInfoSerializer(user_info_instance, data=request.data, partial=True)

        if serializer.is_valid():
            instance = serializer.save()
            
            return Response({'message': 'UserInformation updated successfully'} , status = 200)
        else:
            return Response({"message" : serializer.errors}, status=400)


class SearchMealAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self,request):
        name = request.GET.get('name')
        payload = []
        if name : 
            suggestions = models.FoodItems.objects.filter(food_item__istartswith = name)
            for suggestion in suggestions:
                payload.append({
                    'food_item' : suggestion.food_item,
                    'serving' : suggestion.portion_size,
                    'kcal' : suggestion.calorie
                })

        return Response({'Payload':payload},status=200)


# class SearchWorkoutAPIView(APIView):
#     authentication_classes = []
#     permission_classes = [AllowAny]
#     def get(self,request):
#         name = request.GET.get('name')
#         payload = []
#         if name : 
#             suggestions = models.FoodItems.objects.filter(food_item__istartswith = name)
#             for suggestion in suggestions:
#                 payload.append({
#                     'food_item' : suggestion.food_item
#                 })

#         return Response({'Payload':payload},status=200)
    

class AddWorkoutAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self,request):
        data = JSONParser().parse(request)
        if data.get('userID') :
             user_instance = models.User.objects.get(id=data.get('userID'))
             try : 
                # already document is there with that date
                get_date = models.WorkoutDairy.objects.get(userID = user_instance ,date = data.get('date'))
                get_date.workout += data.get('workout')
                get_date.save()
                return Response({"message" : "added successfully"},status=200)
             except models.WorkoutDairy.DoesNotExist:
                #  we have to make new document as there is no document with that date
                 obj = models.WorkoutDairy.objects.create(userID=user_instance  , date=data.get('date'), workout=data.get('workout'))
                 return Response({"message" : "created document and added successfully"} , status=200)
        else :
            return Response({"meassage" : "please send data with userID"},status=400)
        
    def delete(self, request):
        data = JSONParser().parse(request)
        if data.get('userID'):
            user_instance = models.User.objects.get(id=data.get('userID'))
            date = data.get('date')
            workout_to_delete = data.get('workout')

            if not date or not workout_to_delete:
                return Response({"message": "Please send data with date and workout to delete"}, status=400)

            try:
                workout_entry = models.WorkoutDairy.objects.get(date=date, userID=user_instance)
                updated_workout = [workout for workout in workout_entry.workout if workout not in workout_to_delete]
                if len(updated_workout) < len(workout_entry.workout):
                    workout_entry.workout = updated_workout
                    workout_entry.save()
                    return Response({"message": "Workout deleted successfully"}, status=200)
                else:
                    return Response({"message": "Workout not found in the entry"}, status=404)

            except models.WorkoutDairy.DoesNotExist:
                return Response({"message": "Workout entry not found for the given date and user"}, status=404)
        else:
            return Response({"message": "Please send data with userID"}, status=400)


class GetWorkoutAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self , request):
        # try:
        #         user_instance = models.User.objects.get(id=userID)
        #         print(userID)
        #         workouts = models.WorkoutDairy.objects.filter(userID=user_instance)
        #         print(workouts)
        #         serializer = serializers.WorkoutDairySerializer(workouts, many=True)
        #         return Response({"data" : serializer.data},status=200)
        # except models.User.DoesNotExist:
        #         return Response({"message": "User not found"}, status=404)
        try:
            userID = request.GET.get('user_id')
            user = models.User.objects.get(id=userID)
            end_date = request.GET.get('end_date')
        except models.User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)

        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        start_date = end_date - timedelta(days=6)
        workout_data = models.WorkoutDairy.objects.filter(userID=user, date__range=[start_date, end_date])
        serializer = serializers.WorkoutDairySerializer(workout_data, many=True)
        return Response(serializer.data)

# class AddmealAPIView(APIView):
#     authentication_classes = []
#     permission_classes = [AllowAny]
#     def post(self,request):
#         data = JSONParser().parse(request)
#         if data.get('userID') :
#              user_instance = models.User.objects.get(id=data.get('userID'))
#              try : 
#                 # already document is there with that date
#                 meal_dairy = models.MealDairy.objects.get(userID=user_instance, date=data.get('date'))
#                 # Check if meal data exists and initialize as an empty list if not
#                 if meal_dairy.meal is None or not isinstance(meal_dairy.meal, list):
#                     meal_dairy.meal = []
#                 # Append the new meal data to the existing meal list
#                 meal_dairy.meal.append(data.get('meals'))
#                 print("data.get('meal')",data.get('meals'))
#                 meal_dairy.save()
#                 return Response({"message" : "added successfully"},status=200)
#              except models.MealDairy.DoesNotExist:
#                 #  we have to make new document as there is no document with that date
#                  obj = models.MealDairy.objects.create(userID=user_instance  , date=data.get('date'), meal=data.get('meal'))
#                  return Response({"message" : "created document and added successfully"} , status=200)
#         else :
#             return Response({"meassage" : "please send data with userID"},status=400)
class AddmealAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = JSONParser().parse(request)
        print(data)
        if data.get('userID') and data.get('breakfast'):
            user_instance = models.User.objects.get(id=data.get('userID'))
            try: 
                # Check if a meal diary entry already exists for the given date
                meal_dairy, created = models.MealDairy.objects.get_or_create(userID=user_instance, date=data.get('date'))
                # Initialize meal list if it doesn't exist or if it's None
                if meal_dairy.breakfast is None or not isinstance(meal_dairy.breakfast, list):
                    meal_dairy.breakfast = []
                # Append each meal from the request to the meal list
                for meal_data in data.get('breakfast', []):
                    meal_dairy.breakfast.append(meal_data)
                meal_dairy.save()
                if created:
                    return Response({"message": "Created document and added meal successfully"}, status=200)
                else:
                    return Response({"message": "Added meal to existing document successfully"}, status=200)
            except models.MealDairy.DoesNotExist:
                # Create a new meal diary entry if none exists for the date
                obj = models.MealDairy.objects.create(userID=user_instance, date=data.get('date'), breakfast=data.get('breakfast', []))
                return Response({"message": "Created new document and added meal successfully"}, status=200)
        elif data.get('userID') and data.get('lunch'):
            user_instance = models.User.objects.get(id=data.get('userID'))
            try: 
                # Check if a meal diary entry already exists for the given date
                meal_dairy, created = models.MealDairy.objects.get_or_create(userID=user_instance, date=data.get('date'))
                # Initialize meal list if it doesn't exist or if it's None
                if meal_dairy.lunch is None or not isinstance(meal_dairy.lunch, list):
                    meal_dairy.lunch = []
                # Append each meal from the request to the meal list
                for meal_data in data.get('lunch', []):
                    meal_dairy.lunch.append(meal_data)
                meal_dairy.save()
                if created:
                    return Response({"message": "Created document and added meal successfully"}, status=200)
                else:
                    return Response({"message": "Added meal to existing document successfully"}, status=200)
            except models.MealDairy.DoesNotExist:
                # Create a new meal diary entry if none exists for the date
                obj = models.MealDairy.objects.create(userID=user_instance, date=data.get('date'), lunch=data.get('lunch', []))
                return Response({"message": "Created new document and added meal successfully"}, status=200)
        elif data.get('userID') and data.get('snack'):
            user_instance = models.User.objects.get(id=data.get('userID'))
            try: 
                # Check if a meal diary entry already exists for the given date
                meal_dairy, created = models.MealDairy.objects.get_or_create(userID=user_instance, date=data.get('date'))
                # Initialize meal list if it doesn't exist or if it's None
                if meal_dairy.snack is None or not isinstance(meal_dairy.snack, list):
                    meal_dairy.snack = []
                # Append each meal from the request to the meal list
                for meal_data in data.get('snack', []):
                    meal_dairy.snack.append(meal_data)
                meal_dairy.save()
                if created:
                    return Response({"message": "Created document and added meal successfully"}, status=200)
                else:
                    return Response({"message": "Added meal to existing document successfully"}, status=200)
            except models.MealDairy.DoesNotExist:
                # Create a new meal diary entry if none exists for the date
                obj = models.MealDairy.objects.create(userID=user_instance, date=data.get('date'), snack=data.get('snack', []))
                return Response({"message": "Created new document and added meal successfully"}, status=200)
        elif data.get('userID') and data.get('dinner'):
            user_instance = models.User.objects.get(id=data.get('userID'))
            try: 
                # Check if a meal diary entry already exists for the given date
                meal_dairy, created = models.MealDairy.objects.get_or_create(userID=user_instance, date=data.get('date'))
                # Initialize meal list if it doesn't exist or if it's None
                if meal_dairy.dinner is None or not isinstance(meal_dairy.dinner, list):
                    meal_dairy.dinner = []
                # Append each meal from the request to the meal list
                for meal_data in data.get('dinner', []):
                    meal_dairy.dinner.append(meal_data)
                meal_dairy.save()
                if created:
                    return Response({"message": "Created document and added meal successfully"}, status=200)
                else:
                    return Response({"message": "Added meal to existing document successfully"}, status=200)
            except models.MealDairy.DoesNotExist:
                # Create a new meal diary entry if none exists for the date
                obj = models.MealDairy.objects.create(userID=user_instance, date=data.get('date'), dinner=data.get('dinner', []))
                return Response({"message": "Created new document and added meal successfully"}, status=200)
        else:
            return Response({"message": "Please send data with userID"}, status=400)
        
class GetMealAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            user_id = request.GET.get('user_id')
            print(user_id)
            user = models.User.objects.get(id=user_id)
            
            date = request.GET.get('date')

            # Filter meal data for the specified user and date range
            meal_data = models.MealDairy.objects.filter(userID=user, date = date)
            print(meal_data)
            # Initialize empty dictionaries for each meal type
            meals = {'breakfast': [], 'lunch': [], 'snack': [], 'dinner': []}

            # Populate the meals dictionary
            # for meal_entry in meal_data:
            #     meals['breakfast'].extend(meal_entry.breakfast)
            #     meals['lunch'].extend(meal_entry.lunch)
            #     meals['snack'].extend(meal_entry.snack)
            #     meals['dinner'].extend(meal_entry.dinner)
            for meal_entry in meal_data:
                for meal_type in meals.keys():
                    meal_list = getattr(meal_entry, meal_type)
                    if isinstance(meal_list, list):
                        meals[meal_type].extend([(index, meal) for index, meal in enumerate(meal_list)])


            # Optionally, you can serialize the meals data using a serializer
            # serializer = serializers.MealDairySerializer(meals)
            
            # Return the serialized meal data
            return Response({"meals":meals}, status=200)
        except models.User.DoesNotExist:
            return Response({'message': 'User not found'}, status=404)
        except ValueError:
            return Response({'message': 'Invalid date format. Please provide date in YYYY-MM-DD format'}, status=400)
        
class DeleteMealAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def delete(self, request):
        user_id = request.GET.get('user_id')
        date = request.GET.get('date')
        meal_type = request.GET.get('meal_type')
        meal_index = int(request.GET.get('meal_index'))

        # Get the MealDairy instance
        meal_dairy = get_object_or_404(models.MealDairy, userID=user_id, date=date)

        # Delete the meal from the specified meal type
        if meal_type == 'breakfast':
            if meal_index < len(meal_dairy.breakfast):
                del meal_dairy.breakfast[meal_index]
        elif meal_type == 'lunch':
            if meal_index < len(meal_dairy.lunch):
                del meal_dairy.lunch[meal_index]
        elif meal_type == 'snack':
            if meal_index < len(meal_dairy.snack):
                del meal_dairy.snack[meal_index]
        elif meal_type == 'dinner':
            if meal_index < len(meal_dairy.dinner):
                del meal_dairy.dinner[meal_index]

        # Save the changes
        meal_dairy.save()

        return Response({"message": "Meal deleted successfully"}, status=200)

class SleepAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.data.get('user_ID')
        date = request.data.get('date')
        sleep_time = request.data.get('SleepTime')

        try:
            user = models.User.objects.get(id=user_id)
            user_entry = models.HabitTracker.objects.filter(date=date, userID=user).first()

            if user_entry is None:
                sleep_entry = models.HabitTracker.objects.create(userID=user, SleepTime=sleep_time, date=date)
                sleep_entry.save()
                return Response({"message": "Successfully added sleep time in new document"})
            else:
                user_entry.SleepTime = sleep_time
                user_entry.save()
                return Response({"message": "Added sleep time"})
        except models.User.DoesNotExist:
            return Response({"message": "User ID doesn't exist"}, status=400)
        
    def get(self, request):
        user_id = request.query_params.get('user_ID')

        try:
            user = models.User.objects.get(id=user_id)
            sleep_entries = models.HabitTracker.objects.filter(userID=user).values('date', 'SleepTime')
            return Response({"sleep_entries":sleep_entries},status=200)
        except models.User.DoesNotExist:
            return Response({"message": "User ID doesn't exist"}, status=400)
        
class StepAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.data.get('user_ID')
        date = request.data.get('date')
        steps = request.data.get('Steps')

        try:
            user = models.User.objects.get(id=user_id)
            user_entry = models.HabitTracker.objects.filter(date=date, userID=user).first()

            if user_entry is None:
                step_entry = models.HabitTracker.objects.create(userID=user, Steps=steps, date=date)
                step_entry.save()
                return Response({"message": "Successfully added steps in new document"})
            else:
                user_entry.Steps = steps
                user_entry.save()
                return Response({"message": "Added steps"})
        except models.User.DoesNotExist:
            return Response({"message": "User ID doesn't exist"}, status=400)
        
    def get(self, request):
        user_id = request.query_params.get('user_ID')

        try:
            user = models.User.objects.get(id=user_id)
            step_entries = models.HabitTracker.objects.filter(userID=user).values('date', 'Steps')
            return Response({"step_entries":step_entries},status=200)
        except models.User.DoesNotExist:
            return Response({"message": "User ID doesn't exist"}, status=400)
        
class WeightAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.data.get('user_ID')
        date = request.data.get('date')
        weight = request.data.get('weight')

        try:
            user = models.User.objects.get(id=user_id)
            user_entry = models.HabitTracker.objects.filter(date=date, userID=user).first()

            if user_entry is None:
                step_entry = models.HabitTracker.objects.create(userID=user, Weight = weight, date=date)
                step_entry.save()
                return Response({"message": "Successfully added steps in new document"})
            else:
                user_entry.Weight = weight
                user_entry.save()
                return Response({"message": "Added steps"})
        except models.User.DoesNotExist:
            return Response({"message": "User ID doesn't exist"}, status=400)
        
    def get(self, request):
        user_id = request.query_params.get('user_ID')

        try:
            user = models.User.objects.get(id=user_id)
            weight_entries = models.HabitTracker.objects.filter(userID=user).values('date', 'Weight')
            return Response({"weight_entries":weight_entries},status=200)
        except models.User.DoesNotExist:
            return Response({"message": "User ID doesn't exist"}, status=400)






class AddDataAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self,request):
        file = request.FILES['file']
        print(file)
        # file_path =  file.file
        df = pd.read_excel(file)
        print(df)

        # # Iterate over DataFrame rows and create Food objects
        for index, row in df.iterrows():
            food_item = row['FoodItem']  # Access column by name
            portion_size = row['PortionSize']
            calorie = row['Calorie(Kcal)']
            # Create Food object and save to database
            models.FoodItems.objects.create(food_item=food_item, portion_size=portion_size, calorie=calorie)
        return Response({'message': 'UserInformation updated successfully'} , status = 200)

