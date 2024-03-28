import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Colors from "constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'

interface MealSuggestion {
    food_item: string;
    id: number;
    name: string;
    kcal: number;
    serving: number;
}

export default function Searchlunch() {
    const [searchText, setSearchText] = useState('');
    const [mealSuggestions, setMealSuggestions] = useState([]);
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);
    const  token  = useLocalSearchParams();
    console.log('token', token);
    console.log('token.date',token.date);
    const date = token.date

    const generateSuggestions = async (text: string) => {
        if (text === '') {
            // If search text is empty, clear the meal suggestions
            setMealSuggestions([]);
        } else {
            // // Example list of meal suggestions
            // const suggestions: MealSuggestion[] = [
            //     { id: 1, name: 'Oats', kcal: 128, serving: 1 },
            //     { id: 2, name: 'Scrambled Eggs', kcal: 128, serving: 1 },
            //     { id: 3, name: 'Smoothie', kcal: 128, serving: 1 },
            //     // Add more meal suggestions as needed
            // ];

            // // Filter suggestions based on the entered text
            // const filteredSuggestions = suggestions.filter((meal) =>
            //     meal.name.toLowerCase().startsWith(text.toLowerCase())
            // );

            // setMealSuggestions(filteredSuggestions);
            try {
                // Make an HTTP GET request to your backend API
                const response = await axios.get(`http://192.168.240.61:8000/autosearchMeal/?name=${text}`);
                console.log('API response:', response.data);
                
                // Extract meal suggestions from the response data
                const suggestions: MealSuggestion[] = response.data.Payload.map((item: any) => ({
                    id: item.id,
                    name: item.food_item,
                    kcal: item.kcal,
                    serving: item.serving,
                }));
    
                // Update the frontend state with the received suggestions
                setMealSuggestions(suggestions);
            }catch (error) {
                console.error('Error fetching meal suggestions:', error);
            }
        }
    };

    const handleInputChange = (text) => {
        setSearchText(text);
        generateSuggestions(text);
    };

    const handleSearchBarFocus = () => {
        setIsSearchBarActive(true);
    };

    const handleOutsidePress = () => {
        setIsSearchBarActive(false);
        Keyboard.dismiss();
    };

    function handleBack() {
        router.replace('/(main)/TraclMeal')
    }

    function handleAddLunch(selectedMeal) {
        console.log("selectedMeal",selectedMeal);
        const selectedMealName = selectedMeal.name;
        const selectedMealServing =  selectedMeal.serving;
        const selectedMealkcal = selectedMeal.kcal;
        router.push({pathname: "/(main)/AddLunch", 
            params: {
                'selectedMealName' : selectedMealName,
                'selectedMealServing' : selectedMealServing,
                'selectedMealkcal' : selectedMealkcal,
                'date' : date
            }});  
    }

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: Colors.dark.background,
                // backgroundColor:'pink',
            }}>
                <View style={{
                    height: 50,
                    // backgroundColor:'lightblue',
                    borderRadius: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity onPress={handleBack}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 32,
                        marginLeft: 30,
                    }}>Lunch</Text>
                </View>

                <View style={{
                    marginTop: 20,
                    backgroundColor: '#875B70',
                    opacity: 0.7,
                    borderRadius: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: 10,
                }}>
                    <Ionicons name="search-sharp" size={30} color="black" />
                    <TextInput
                        style={{ flex: 1, fontSize: 18, marginLeft: 10, }}
                        placeholder={searchText === '' ? 'Search Your Lunch' : ''}
                        placeholderTextColor="black"
                        onChangeText={handleInputChange}
                        value={searchText}
                        onFocus={handleSearchBarFocus}
                    />
                </View>

                {isSearchBarActive || mealSuggestions.length > 0 ? (
                    <FlatList<MealSuggestion>
                        style={{ flex: 1, marginTop: 10 }}
                        data={mealSuggestions}
                        keyExtractor={(item) => item.food_item}
                        renderItem={({ item }): JSX.Element => (
                            <View style={{
                                padding: 10,
                                backgroundColor: '#875B70',
                                borderRadius: 10,
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingRight: 30,
                                paddingLeft: 30,
                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, color: '#FFFF' }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, marginRight: 10, color: '#FFFF' }}>{item.kcal} kcal</Text>
                                        <Text style={{ fontSize: 16, marginLeft: 10, color: '#FFFF' }}>{item.serving}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleAddLunch(item)}>
                                    <MaterialIcons name="add-circle-outline" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ) : (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                    }}>
                        <Image source={require('../../assets/images/BackGround.jpg')} style={{ borderRadius: 60 }} />
                        <Text>Find inspiration for a healthy breakfast</Text>
                    </View>
                )}

            </View>
        </TouchableWithoutFeedback>
    );
}
