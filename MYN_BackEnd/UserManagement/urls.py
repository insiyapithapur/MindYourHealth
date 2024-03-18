from django.urls import path , include
from . import views

urlpatterns = [
    path('SignUp',views.UserSignUpAPIView.as_view()), #GPUD
    path('Login',views.UserLoginAPIView.as_view()), #GPUD
    path('user_info', views.UserInformationAPIView.as_view()), #GPUD
    path('profile/<userID>', views.GetUserInfoAPIView.as_view()) , #GPUD
    path('update-profile/<user_id>', views.UpdateUserInformationAPIView.as_view()),
    path('autosearchMeal/',views.SearchMealAPIView.as_view(),name='autosearch_meal'), #GPUD
    # path('autoSearchWorkout',views.SearchWorkoutAPIView.as_view()),
    path('addworkout',views.AddWorkoutAPIView.as_view()), #GPUD
    path('getworkout/',views.GetWorkoutAPIView.as_view()), #GPUD
    path('addmeal',views.AddmealAPIView.as_view()), #GPUD
    path('getmeals/',views.GetMealAPIView.as_view()), #GPUD
    path('deletemeal/',views.DeleteMealAPIView.as_view()),
    path('sleep',views.SleepAPIView.as_view()), #GPUD
    path('step',views.StepAPIView.as_view()), #GPUD
    path('weight',views.WeightAPIView.as_view()), #GPUD


    path('importDatatoDB',views.AddDataAPIView.as_view())
    # path('suggestion',views.DietSuggestionsAPIView.as_view())
]