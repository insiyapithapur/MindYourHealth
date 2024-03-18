import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import { View , Text, TouchableOpacity, ImageBackground } from "react-native";

export default function TrackWorkout(){
    const [date, setDate] = useState(new Date());

    const handleDateChange = (increment) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + increment);
        setDate(newDate);
    };
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
    const isToday = date.toLocaleDateString() === new Date().toLocaleDateString();

    function handleAddWorkout(){
        router.push('/(main)/SearchWorkout')
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
                {/* <Text>nbscsh</Text> */}
            </View>
        </View>
    );
}