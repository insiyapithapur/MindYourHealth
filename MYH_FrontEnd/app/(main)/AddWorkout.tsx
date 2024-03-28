import { Entypo, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Picker, ScrollView } from "react-native";

export default function AddDinner() {
    const token = useLocalSearchParams();
    console.log('token', token);
    console.log('name', token.selectedMealName);
    console.log('date', token.date);
    console.log ('image-url' , token.image_url);

    const name = token.name;
    const date = token.date;
    const image_url = token.image_url;

    const [userID, setUserID] = useState("");
    const [timeAmount, setTimeAmount] = useState('');
    const [timeUnit, setTimeUnit] = useState('sec'); 
    const [sets, setSets] = useState('');
    const [times, setTimes] = useState('');
    const [note, setNote] = useState('');
    const [selectedValue, setSelectedValue] = useState('How Long?');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownSelect = (value) => {
        setSelectedValue(value);
        setDropdownVisible(false);
    };

    useEffect(() => {
        const fetchUserID = async () => {
            const storedUserID = await AsyncStorage.getItem('userID');
            setUserID(storedUserID);
        };
        fetchUserID();
    }, []);

    const handleTrack = async () => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        console.log("*********************************")
        console.log('name', name)
        console.log("formattedDate", formattedDate);
        console.log("userID", userID);
        console.log('Time amount:', timeAmount);
        console.log('Time unit:', timeUnit);
        console.log('Sets:', sets);
        console.log('Times:', times);
        console.log('Note:', note);
        console.log("*********************************")

        const workoutdatalist = [
            {
                name: name,
                time : timeAmount + " " +timeUnit ,
                counts : sets + "sets "+times + "times",
                note : note
            }
        ];

        const workoutdata = {
            userID: userID,
            date: formattedDate, 
            workout: workoutdatalist
        };
    
        console.log("workout data:", workoutdata);
        try{
            const response = await axios.post('http://192.168.240.61:8000/addworkout', 
                        workoutdata,
                        {
                          headers: { "Content-Type": "application/json" },
                        });
            if (response.status === 200) {
                console.log('API response:', response.data)
                router.replace('/(main)/TrackWorkout')
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

    const handleBack = () => {
        router.replace('/(main)/TrackWorkout')
    }
    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            backgroundColor: Colors.dark.background,
            // backgroundColor:'lightpink',
        }}>
            <View style={{
                flex: 1,
                backgroundColor: 'lightblue',
                borderRadius: 10,
                marginBottom: -10,
            }}>
                <ImageBackground source={{ uri: image_url }} style={{ flex: 1, position: 'relative' }}>
                    <Ionicons name="arrow-back" size={35} color="black" onPress={handleBack}/>
                    <Text style={{ position: 'absolute', bottom: 10, left: 20, fontSize: 32 }}>{name}</Text>
                </ImageBackground>
            </View>

            <View style={{
                flex: 1.5,
                backgroundColor: '#875B70',
                opacity: 0.6,
                borderRadius: 15,
                flexDirection: 'column',
            }}>
                <View style={{ flexDirection: 'column', padding: 20,}}>
                    <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={{ padding: 10, borderRadius:10 , backgroundColor: '#875B70',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:18,color:"white"}}>{selectedValue || 'Select an option'}</Text>
                        <Entypo name="triangle-down" size={24} color="white" />
                    </TouchableOpacity>

                    {dropdownVisible && (
                        <View style={{borderRadius: 5, margin: 5 }}>
                            <TouchableOpacity onPress={() => handleDropdownSelect('How Long?')} style={{ padding: 10, margin: 5,backgroundColor: '#875B70' , borderRadius:10}}>
                                <Text style={{fontSize:18,color:"white"}}>How Long ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDropdownSelect('How much ?')} style={{ padding: 10, margin: 5 , backgroundColor: '#875B70', borderRadius:10}}>
                                <Text style={{fontSize:18,color:"white"}}>How much ?</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Conditional rendering of text based on selected option */}
                    {selectedValue === 'How Long?' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop:10}}>
                                <TextInput
                                    style={{backgroundColor: 'white', borderRadius: 10, padding: 10, fontSize: 18, color: 'black' }}
                                    placeholder="Enter amount"
                                    placeholderTextColor="black"
                                    value={timeAmount}
                                    onChangeText={setTimeAmount}
                                    keyboardType="numeric"
                                />
                            <TouchableOpacity
                                style={{ backgroundColor: timeUnit === 'sec' ? '#C66895' : '#875B70', padding: 8, borderRadius: 5 , marginLeft: 30 }}
                                onPress={() => setTimeUnit('sec')}
                            >
                                <Text style={{color:'white' , fontSize:16}}>Sec</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: timeUnit === 'min' ? '#C66895' : '#875B70', padding: 8, borderRadius: 5, marginLeft: 10 }}
                                onPress={() => setTimeUnit('min')}
                            >
                                <Text style={{color:'white' , fontSize:16}}>Min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: timeUnit === 'hours' ? '#C66895' : '#875B70', padding: 8, borderRadius: 5, marginLeft: 10 }}
                                onPress={() => setTimeUnit('hours')}
                            >
                                <Text style={{color:'white', fontSize:16}}>Hours</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {selectedValue === 'How much ?' && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop:10}}>
                            <TextInput
                                style={{backgroundColor: 'white', borderRadius: 10, padding: 10, fontSize: 18, color: 'black' }}
                                placeholder="Sets"
                                placeholderTextColor="black"
                                value={sets}
                                onChangeText={setSets}
                                keyboardType="numeric"
                            />
                            <Text style={{ marginHorizontal: 10 }}>x</Text>
                            <TextInput
                                style={{backgroundColor: 'white', borderRadius: 10, padding: 10, fontSize: 18, color: 'black'}}
                                placeholder="Times"
                                placeholderTextColor="black"
                                value={times}
                                onChangeText={setTimes}
                                keyboardType="numeric"
                            />
                        </View>
                    )}
                </View>


                {/* Notes section */}
                <View style={{marginHorizontal: 20 , marginBottom:10}}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Notes</Text>
                    <TextInput
                        style={{ backgroundColor: 'white', padding: 10 , color:'black' , borderRadius:10,fontSize:16,height:70}}
                        placeholder="Add notes"
                        placeholderTextColor="black"
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />
                </View>

                {/* Track button */}
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
                        <Text style={{fontSize:28,color:'white'}}>Track</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
