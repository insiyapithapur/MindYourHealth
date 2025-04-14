# MYH - Mind Your Health

A comprehensive health and fitness application designed to empower users in their journey towards a healthier lifestyle.

## Project Overview

MYH (Mind Your Health) is a full-stack mobile application that helps users track their nutrition, workouts, and overall health. It provides personalized plans based on user goals and offers comprehensive tools for dietary management, fitness tracking, and wellness monitoring.

In today's fast-paced world, maintaining a healthy lifestyle has become more challenging. With the prevalence of sedentary habits and unhealthy eating patterns, the need for comprehensive health and fitness solutions is greater than ever. MYN addresses this need by providing a one-stop solution for all aspects of health management.

## Key Features

- **User Authentication**: Secure registration and login using email
- **Personalized Profile**: Set health goals, track progress, and manage personal details
- **Diet Tracking**: Monitor daily food intake, track nutritional values, and set personalized nutrition goals
- **Workout Management**: Access guided workouts, create custom exercise plans, and track progress
- **Calorie Tracking**: Monitor calorie intake and expenditure with intuitive tools
- **Recipe Browse**: Explore a diverse collection of nutritious recipes
- **Meditation & Yoga**: Access guided meditation sessions and yoga practices
- **Menstrual Cycle Tracking**: Track menstrual cycles with an integrated calendar

## System Workflow

![image](https://github.com/user-attachments/assets/70419fe5-1af6-4d59-bb62-288ad35a8685)

## Database Design 

![image](https://github.com/user-attachments/assets/f0070b46-1679-462f-aa71-8aeaae236d3c)

## Figma Design 
![image](https://github.com/user-attachments/assets/79d310ce-40a3-44b5-9d97-5b5511f52ea0)
Link: https://www.figma.com/design/gUSMHI6G8i1R6WmJ1JLnXA/Make-your-health?node-id=0-1&t=yS9o5bnRYK13hWQQ-1

## Technology Stack

### Frontend
- **Framework**: React Native with Expo Router
- **Form Validation**: Zod
- **State Management**: React hooks
- **Local Storage**: AsyncStorage
- **HTTP Client**: Axios
- **UI Design**: Custom components with consistent styling
- **Icons**: Expo vector icons

### Backend
- **Framework**: Django REST Framework
- **Database**: MongoDB with Djongo connector
- **Authentication**: Custom JWT-based authentication
- **Data Processing**: Pandas for handling datasets

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (v4.4 or higher)

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/MYN_Project.git
   ```

2. Navigate to backend directory
   ```bash
   cd MYN_BackEnd
   ```

3. Create a virtual environment
   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

5. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

6. Set up MongoDB
   - Make sure MongoDB is running
   - Create a database named "HealthCareFinal"

7. Run migrations
   ```bash
   python manage.py migrate
   ```

8. Start the server
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to frontend directory
   ```bash
   cd MYH_FrontEnd
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Update API endpoint
   - Open files containing API calls (like Login.tsx, Signup.tsx, etc.)
   - Update the IP address in the axios.post URLs to match your backend server

4. Start the app
   ```bash
   npm start
   ```

## Project Structure

### Backend (Django)
- **HeathCareFinal/**: Django project settings and configuration
- **UserManagement/**: Main app containing models, views, and API endpoints
- **models.py**: Database schema definitions
- **views.py**: API endpoint implementations
- **urls.py**: URL routing configuration
- **serializers.py**: Data serialization/deserialization

### Frontend (React Native)
- **app/**: Main application code
  - **(auth)/**: Authentication screens (Login, Signup)
  - **(main)/**: Main app screens (Home, Profile, Track meal, etc.)
  - **(onboarding)/**: Onboarding experience screens
  - **(questionnaire)/**: User information collection screens
- **components/**: Reusable UI components
- **constants/**: App-wide constants (colors, styles, etc.)
- **assets/**: Images and other static assets

## API Endpoints

### Authentication
- `POST /SignUp`: Register a new user
- `POST /Login`: Authenticate a user

### User Information
- `POST /user_info`: Add user health information
- `GET /profile/<userID>`: Get user profile
- `PATCH /update-profile/<user_id>`: Update user profile

### Meal Management
- `GET /autosearchMeal/`: Search for meals
- `POST /addmeal`: Add a meal to diary
- `GET /getmeals/`: Get user's meal records
- `DELETE /deletemeal/`: Delete a meal from diary

### Workout Management
- `GET /autosearchWorkout/`: Search for workouts
- `POST /addworkout`: Add workout to diary
- `GET /getworkout/`: Get user's workout records
- `GET /allworkout/`: Get all workout categories

### Content Libraries
- `GET /allrecepie/`: Get all recipes
- `GET /allyoga/`: Get all yoga poses
- `GET /allmeditation/`: Get all meditation techniques

### Health Tracking
- `POST /sleep`: Log sleep data
- `GET /sleep`: Get sleep records
- `POST /step`: Log step data
- `GET /step`: Get step records
- `POST /weight`: Log weight data
- `GET /weight`: Get weight records

## Some Screenshots

Login: ![image](https://github.com/user-attachments/assets/26e2806f-80c9-4a07-89ed-7e806ce04be0)

SignUp:
![image](https://github.com/user-attachments/assets/25d3a2ab-a0ca-486a-a30f-609f0a9cf42f)
![image](https://github.com/user-attachments/assets/688b7f65-79a4-459e-910c-043d9a8af1fd)
![image](https://github.com/user-attachments/assets/d9ac4252-e3f4-441f-99ca-45be5dafde0d)
![image](https://github.com/user-attachments/assets/bd6e436e-6599-4bcc-865e-208b293e00b4)

Main Features: 
![image](https://github.com/user-attachments/assets/d1da5873-282a-44df-8a92-4b94b8213d3a)
![image](https://github.com/user-attachments/assets/1d07f079-b7a7-4550-80e5-88b55d924103)
![image](https://github.com/user-attachments/assets/c54eae2f-6152-48bd-a007-c4a3bd62a7a5)
![image](https://github.com/user-attachments/assets/2bfcb1b5-f7f5-464a-b7de-964a111057d6)
![image](https://github.com/user-attachments/assets/354e68ea-cb40-4643-890f-52d39ed53356)
![image](https://github.com/user-attachments/assets/aac74f4f-6c45-427e-a477-e74fed435148)
![image](https://github.com/user-attachments/assets/93f99bed-5ece-4bfc-94c2-e536aae5a04f)
![image](https://github.com/user-attachments/assets/8f9b7937-a0fd-4fc4-ab80-931abbfe53c3)
