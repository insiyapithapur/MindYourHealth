import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from 'constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity , StyleSheet} from 'react-native';

export default function Screen2(){
    const [activityLevel, setActivityLevel] = useState('');
    const token = useLocalSearchParams();
    const age = token.age;
    const currentWeight = token.currentWeight;
    const gender = token.gender;
    const goals = token.goals;
    const height = token.height;
    const targetWeight = token.targetWeight;
    const [userID, setUserID] = useState("");
    const [username, setusername] = useState("");
    const [tdee, setTDEE] = useState(0); 
    const [bmr, setBMR] = useState(0); 

    useEffect(() => {
        const fetchUserID = async () => {
        const storedUserID = await AsyncStorage.getItem('userID');
        const storedusername = await AsyncStorage.getItem('username');
        setUserID(storedUserID);
        setusername(storedusername);
        };
        fetchUserID();
    }, []);
    console.log("userID in screen2",userID);
    console.log("username in screen2",username);

    const handleSelectActivityLevel = (level) => {
        setActivityLevel(level);
    };
    const getActivityMultiplier = (activityLevel) => {
        // Define activity multipliers based on activity levels
        switch (activityLevel) {
            case 'Sedentary':
                return 1.2;
            case 'Lightly active':
                return 1.375;
            case 'Moderately active':
                return 1.55;
            case 'Very active':
                return 1.725;
            default:
                return 1;
        }
    };
    const calculateBMR = (age, weight, height, gender) => {
        let bmr = 0;
        if (gender == 'Male'){
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)}
        else if (gender == 'Female'){
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)}
        else{
            bmr = 0}
        return bmr;
    };

    const calculateTDEE = (bmr, activityMultiplier) => {
        // Calculate TDEE using BMR and activity multiplier
        // Example calculation:
        return bmr * activityMultiplier;
    };
    const calculateTDEEAndBMR = (activityLevel,age,currentWeight,height,gender) => {
        const currentWeightNumeric = parseFloat(currentWeight.split(' ')[0]);
        const heightNumeric = parseFloat(height.split(' ')[0]);
        console.log(activityLevel," ",age," ",currentWeightNumeric," ",heightNumeric," ",gender)
        const activityMultiplier = getActivityMultiplier(activityLevel);
        console.log(activityMultiplier)
        const bmrValue = calculateBMR(age, currentWeightNumeric, heightNumeric, gender);
        console.log(bmrValue)
        const tdeeValue = calculateTDEE(bmrValue, activityMultiplier);
        console.log(tdeeValue)
        setBMR(bmrValue);
        setTDEE(tdeeValue);
    };
    const handleSave = async () => {
        try{
            // calculateTDEEAndBMR(activityLevel,age,currentWeight,height,gender);
            console.log(tdee , " ",bmr);
            // Save the data to backend or perform other actions
            const PassingUserInfo = {
                userID : userID,
                motive: goals,
                targetWeight: targetWeight,
                gender: gender,
                age: age,
                height: height,
                currentWeight: currentWeight,
                activitylevel : activityLevel,
                tdee: tdee,
                bmr: bmr 
            };
            console.log('UserInfo:', PassingUserInfo);
            const response = await axios.post('http://192.168.83.61:8000/user_info', 
                        PassingUserInfo,
                        {
                          headers: { "Content-Type": "application/json" },
                        });
            if (response.status === 200) {
                console.log('API response:', response.data);
                console.log('calorieinstakeperday',response.data.calorieinstakeperday);
                const calorieinstakeperday = response.data.calorieinstakeperday;
        
                router.replace('/(main)/home_Screen')
            } else {
                console.error('API request failed with status:', response.status);
            }
            } catch (error) {
            // Catch network errors
            console.error("Network Error:", error);
            // Add more specific catch blocks for different types of errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("API Error:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else if(error.message){
                // Something happened in setting up the request that triggered an Error
                console.error("Request setup error:", error.message);
            }else{
                console.error('Error saving userID to AsyncStorage:', error);
            }
            }
      };
    return(
        <View style={styles.container}>
            <View style={{ flex: 1.1, paddingTop: 10, }}>
            <Text style={styles.question}>What’s your activity level?</Text>
            <TouchableOpacity onPress={() => handleSelectActivityLevel('Sedentary')} 
                              style={[styles.option, activityLevel === 'Sedentary' && { backgroundColor: '#C66895', }]}>
                <Text style={styles.optionText}>Sedentary</Text>
                <Text style={styles.description}>You get no formal exercise and are not physically active during the day.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectActivityLevel('Lightly active')}
                              style={[styles.option, activityLevel === 'Lightly active' && { backgroundColor: '#C66895', }]}>
                <Text style={styles.optionText}>Lightly active</Text>
                <Text style={styles.description}>You perform lifestyle activities, like taking the dog for a walk or gardening.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectActivityLevel('Moderately active')}
                              style={[styles.option, activityLevel === 'Moderately active' && { backgroundColor: '#C66895', }]}>
                <Text style={styles.optionText}>Moderately active</Text>
                <Text style={styles.description}>You participate in cardio exercises for 20 to 60 minutes, 3 to 5 days per week.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectActivityLevel('Very active')}
                              style={[styles.option, activityLevel === 'Very active' && { backgroundColor: '#C66895', }]}>
                <Text style={styles.optionText}>Very active</Text>
                <Text style={styles.description}>You exercise for 20 to 60 minutes almost every day.</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSave}
                style={{
                    paddingTop: 10,
                    marginTop: 10,
                    justifyContent:'space-between',
                    backgroundColor: '#875B70',
                    paddingVertical: 15,
                    borderRadius: 10,
                    // alignItems: 'flex-end',
                    flexDirection:'row'
                }}>
                    <View></View>
                    <View style={{alignItems: 'center',justifyContent:'center'}}>
                        <Text style={{color: 'white',fontSize: 24,}}>Submit</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                        <Ionicons
                        name="arrow-forward-outline"
                        size={30}
                        color="white"
                        />
                    </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        backgroundColor: Colors.dark.background,
    },
    question: {
        fontSize: 24,
        marginBottom: 30,
    },
    option: {
        backgroundColor: '#875B70',
        marginBottom: 10,
        borderRadius:10,
        padding:20,
    },
    optionText: {
        fontSize: 20,
        color:'white'
    },
    description: {
        fontSize: 16,
        color: 'white',
    },
});