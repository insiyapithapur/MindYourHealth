import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "constants/Colors";
import { router } from "expo-router";

export default function TraclMeal() {
    const [mealData, setMealData] = useState(null);
    const [userID, setUserID] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
    const isToday = date.toLocaleDateString() === new Date().toLocaleDateString();

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
                const response = await axios.get(`http://192.168.240.61:8000/getmeals/?user_id=${storedUserID}&date=${formattedDate}`);
                setMealData(response.data.meals);
            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        };

        fetchData();
    }, [date]);

    const handleDateChange = async (increment) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + increment);
        setDate(newDate);
        setSelectedDate(newDate);
    };

    const handleAddMeal = (mealType) => {
        router.replace({ pathname: `/(main)/Search${mealType}`, params: { date: selectedDate } });
    };

    const handleDeleteMeal = async (mealType, mealIndex) => {
        try {
            const formattedDate = formatDate(selectedDate);
            await axios.delete(`http://192.168.240.61:8000/deletemeal/?user_id=${userID}&date=${formattedDate}&meal_type=${mealType}&meal_index=${mealIndex}`);
            // After successful deletion, fetch updated meal data
            const response = await axios.get(`http://192.168.240.61:8000/getmeals/?user_id=${userID}&date=${formattedDate}`);
            setMealData(response.data.meals);
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    return (
        <ScrollView style={{ flexDirection: 'column', flex: 1, backgroundColor: Colors.dark.background }}>
            <View style={{ height: 50, backgroundColor: "#D9D9D9", borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => handleDateChange(-1)}>
                    <AntDesign name="left" size={30} color="black" />
                </TouchableOpacity>
                <Text>{date.toDateString()}</Text>
                <TouchableOpacity onPress={() => handleDateChange(+1)} disabled={isToday}>
                    <AntDesign name="right" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Render meal sections */}
            {mealData && Object.entries(mealData).map(([mealType, meals]) => (
                <View key={mealType} style={{ flexDirection: "column", backgroundColor: '#875B70', borderRadius: 10, padding: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", opacity: 0.7, justifyContent: 'space-between', alignItems: 'center', paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 26 , color:"white"}}>{mealType}</Text>
                        <TouchableOpacity onPress={() => handleAddMeal(mealType)}>
                            <Ionicons name="add-circle-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/* Render meals */}
                    {meals.map(([index, meal]) => (
                        <View key={index} style={{ flexDirection: 'row', backgroundColor: '#FFFF', paddingLeft: 10, paddingRight: 10, borderRadius: 10, marginTop: 5, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 24 }}>{meal.name}</Text>
                                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                                    <Text style={{ fontSize: 18, marginRight: 10 }}>{meal.kcal} kcal</Text>
                                    <Text style={{ fontSize: 18, marginLeft: 10 }}>{meal.serving} serving</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => handleDeleteMeal(mealType, index)}>
                                <MaterialCommunityIcons name="delete" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}
