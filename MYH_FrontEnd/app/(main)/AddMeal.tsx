import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text,View,Image, ImageBackground, TextInput, TouchableOpacity } from "react-native";

export default function AddMeal(){
    const  token  = useLocalSearchParams();
    console.log('token', token);
    console.log('name',token.selectedMealName);
    console.log('serving',token.selectedMealServing);
    console.log('kcal',token.selectedMealkcal);
    console.log('date',token.date);
    
    const name = token.selectedMealName;
    const serving  = token.selectedMealServing;
    const kcal = token.selectedMealkcal;
    const date = token.date;
    
    const [servingInput, setServingInput] = useState('1');
    const [userID, setUserID] = useState("");
    useEffect(() => {
        const fetchUserID = async () => {
          const storedUserID = await AsyncStorage.getItem('userID');
          setUserID(storedUserID);
        };
        fetchUserID();
      }, []);

    function extractNumericAndUnit(servingString) {
        const match = servingString.match(/^(\d+(?:\.\d+)?)\s*(\D*)$/);
        if (match) {
            const numeric = parseFloat(match[1]);
            const unit = match[2].trim();
            return [numeric, unit];
        }
        return [null, null];
    }
    const [numericServing, unitServing] = extractNumericAndUnit(serving);
    console.log('numericServing', numericServing);
    console.log('unitServing', unitServing);

    const totalKcal = (parseFloat(kcal) * parseFloat(servingInput)).toFixed(2);
    async function handleTrack(){
        const formattedDate = new Date(date).toISOString().split('T')[0];
        console.log("*********************************")
        console.log('serving',servingInput)
        console.log("total kcal",totalKcal)
        console.log('meal name',name)
        console.log("Date",formattedDate);
        console.log("userID",userID);
        console.log("*********************************")

        const breakfast = [
            {
                name: name,
                serving: servingInput,
                kcal: totalKcal
            }
            // Add more meal objects here if needed
        ];
    
        const mealData = {
            userID: userID,
            date: formattedDate, // Convert date to string format
            breakfast: breakfast  // Assign the array of meal objects
        };
    
        console.log("Meal Data:", mealData);
        try{
            const response = await axios.post('http://192.168.240.61:8000/addmeal', 
                        mealData,
                        {
                          headers: { "Content-Type": "application/json" },
                        });
            if (response.status === 200) {
                console.log('API response:', response.data)
                router.replace('/(main)/TraclMeal')
            } else {
                console.error('API request failed with status:', response.status);
            }
        }catch (error) {
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
    }

    return(
        <View style={{
            flexDirection:'column',
            flex:1,
            backgroundColor: Colors.dark.background,
            // backgroundColor:'lightpink',
        }}>
            <View style={{
                flex:1,
                backgroundColor:'lightblue',
                borderRadius:10,
                marginBottom: -10,
            }}>
                <ImageBackground source={require('../../assets/images/trackMeal.jpg')} style={{flex:1,position: 'relative'}}> 
                   <Ionicons name="arrow-back" size={35} color="black" />
                   <Text style={{position: 'absolute', bottom: 10,left:20, fontSize: 40}}>{name}</Text>
                </ImageBackground>
            </View>

            <View style={{
                flex:1.5,
                backgroundColor:'#875B70',
                opacity:0.6,
                borderRadius:15,
                flexDirection: 'column',
            }}>
                <View style={{flexDirection:'column',paddingTop: 20,paddingLeft:15,}}>
                    <Text style={{fontSize:24}}>Serving : </Text>
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                        <TextInput style={{ backgroundColor: 'white', borderRadius: 10,width:70,height:70,padding:10,fontSize:26,}} 
                            keyboardType="numeric"
                            defaultValue={String(numericServing)} 
                            onChangeText={(value) => setServingInput(value)}
                        />
                        <Text style={{fontSize:28,marginLeft:10}}>{unitServing}</Text>
                    </View>
                </View>
                
                <Text style={{fontSize:24,marginTop:20,paddingLeft:15}}>kcal: </Text>
                <View style={{flexDirection:'column',paddingTop: 5,paddingLeft:15,justifyContent:'center',alignItems:'center'}}>
                    <View style={{
                        width: 200,
                        height: 200,
                        backgroundColor: '#BE809E',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems:"center",
                    }}>
                        <Text style={{fontSize:28,}}>{totalKcal} kcal</Text>
                    </View>
                </View>

                <TouchableOpacity style={{flexDirection:'column',paddingTop: 5,paddingLeft:15,justifyContent:'center',alignItems:'center'}} 
                                  onPress={handleTrack} 
                                  >
                    <View style={{
                        width: 200,
                        height: 50,
                        backgroundColor: '#875B70',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems:"center",
                        marginTop:30,
                    }}>
                        <Text style={{fontSize:28}}>Track</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}