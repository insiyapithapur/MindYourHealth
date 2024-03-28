import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "constants/Colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View , Text, TouchableOpacity, ImageBackground } from "react-native";

export default function TrackWorkout(){
    const [userID, setUserID] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [workoutData, setWorkoutData] = useState([]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserID = await AsyncStorage.getItem('userID');
                setUserID(storedUserID);
                const formattedDate = formatDate(date);
                const response = await axios.get(`http://192.168.240.61:8000/getworkout/?userID=${storedUserID}&date=${formattedDate}`);
                setWorkoutData(response.data.workouts);
                console.log("response", response.data.workouts);
            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        };

        fetchData();
    }, [date]);

    const handleDateChange = (increment) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + increment);
        setDate(newDate);
        setSelectedDate(newDate);
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
    const isToday = date.toLocaleDateString() === new Date().toLocaleDateString();

    function handleAddWorkout(){
        router.push({pathname : '/(main)/SearchWorkout', params: { date: selectedDate }})
    }

    return(
        <View style={{
            flexDirection:'column',
            flex:1,
            backgroundColor: Colors.dark.background,
            // backgroundColor:'lightpink'
        }}>
            <View style={{
                height: 50,
                backgroundColor: "#D9D9D9",
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                paddingHorizontal: 10,
            }}>
                <TouchableOpacity onPress={() => handleDateChange(-1)}>
                    <AntDesign name="left" size={30} color="black" />
                </TouchableOpacity>
                <Text>{date.toDateString()}</Text>
                <TouchableOpacity onPress={() => handleDateChange(+1)} disabled={isToday}>
                    <AntDesign name="right" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <ImageBackground source={require('../../assets/images/addActivity.jpg')}
                    imageStyle={{ borderRadius: 10, opacity: 0.6 }}>
            <View style={{
                // backgroundColor:'lightpink',
                height:100,
                flexDirection:'row',
                alignItems:'center'
            }}>
                <TouchableOpacity onPress={handleAddWorkout}>
                    <Ionicons name="add-circle-outline" size={50} color="black" style={{marginLeft:50}}/>
                </TouchableOpacity>
                <Text style={{fontSize:32,marginLeft:20}}>Add Acitvity</Text>
            </View>
            </ImageBackground>

            <View style={{
                flex:1,
                // backgroundColor:'lightpink',
                marginTop:10
            }}>
                {workoutData.map((workoutEntry, index) => (
                    <View key={index} style={{ flexDirection: 'row', backgroundColor: '#875B70', paddingLeft: 10, paddingRight: 10, borderRadius: 10, marginTop: 5, justifyContent: 'space-between' }}>
                            {workoutEntry.workout.map((workout, index) => (
                                 <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 24 , color:'white',  marginBottom:8}}>{workout.name}</Text>
                                    <View style={{ flexDirection: 'column', paddingBottom: 5 }}>
                                        {workout.time !== ' sec' && <Text style={{ fontSize: 18, marginRight: 10 , color:'white', marginBottom:8}}>{workout.time}</Text>}
                                        {workout.counts !== 'sets times' && <Text style={{ fontSize: 18, marginRight: 10 , color:'white' , marginBottom:8}}>{workout.counts}</Text>}
                                        <Text style={{ fontSize: 18, marginRight: 10 , color:'white',  marginBottom:8 }}>{workout.note}</Text>
                                    </View>
                                 </View>
                            ))}
                            {/* <TouchableOpacity onPress={() => handleDelete(mealType, index)}>
                                <MaterialCommunityIcons name="delete" size={30} color="black" />
                            </TouchableOpacity> */}
                        </View>
                ))}
            </View>
        </View>
    );
}
