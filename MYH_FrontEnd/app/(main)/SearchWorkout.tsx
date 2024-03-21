import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Colors from "constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native'

interface WorkoutSuggestion {
    id: number;
    name: string;
    image_url: string;
}

export default function AddWorkout() {
    const [searchText, setSearchText] = useState('');
    const [workoutSuggestions, setWorkoutSuggestions] = useState([]);
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);
    const searchInputRef = useRef<TextInput>(null);
    const  token  = useLocalSearchParams();
    console.log('token', token);
    console.log('token.date',token.date);
    const date = token.date;

    const generateSuggestions = async (text: string) => {
        if (text === '') {
            // If search text is empty, clear the workout suggestions
            setWorkoutSuggestions([]);
        } else {
            // // Example list of workout suggestions
            // const suggestions: WorkoutSuggestion[] = [
            //     { id: 1, name: 'Running' },
            //     { id: 2, name: 'Cycling' },
            //     { id: 3, name: 'PushUps' },
            //     // Add more workout suggestions as needed
            // ];

            // // Filter suggestions based on the entered text
            // const filteredSuggestions = suggestions.filter((workout) =>
            //     workout.name.toLowerCase().startsWith(text.toLowerCase())
            // );

            // setWorkoutSuggestions(filteredSuggestions);
            try {
                // Make an HTTP GET request to your backend API
                const response = await axios.get(`http://192.168.83.61:8000/autosearchWorkout/?name=${text}`);
                console.log('API response:', response.data);
                
                // Extract meal suggestions from the response data
                const suggestions: WorkoutSuggestion[] = response.data.Payload.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    image_url : item.image_url
                }));
    
                // Update the frontend state with the received suggestions
                setWorkoutSuggestions(suggestions);
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
        searchInputRef.current?.focus();
    };

    const handleOutsidePress = () => {
        setIsSearchBarActive(false);
        Keyboard.dismiss();
    };

    function handleAddWorkout(selectedWorkout) {
        console.log("selectedWorkout", selectedWorkout);
        const name = selectedWorkout.name;
        console.log("name in searchworkout",name);
        const image_url = selectedWorkout.image_url;
        router.push({pathname: "/(main)/AddWorkout", 
            params: {
                'name' : name,
                'image_url' : image_url,
                'date' :  date
            }});   
    }

    function handleBack() {
        router.replace('/(main)/TrackWorkout')
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
                    }}>Acitvity</Text>
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
                        ref={searchInputRef}
                        style={{ flex: 1, fontSize: 18, marginLeft: 10, }}
                        placeholder={searchText === '' ? 'Search Your Activity' : ''}
                        placeholderTextColor="black"
                        onChangeText={handleInputChange}
                        value={searchText}
                        onFocus={handleSearchBarFocus}
                    />
                </View>

                {isSearchBarActive || workoutSuggestions.length > 0 ? (
                    <FlatList<WorkoutSuggestion>
                        style={{ flex: 1, marginTop: 10 }}
                        data={workoutSuggestions}
                        keyExtractor={(item) => item.name}
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
                                </View>
                                <TouchableOpacity onPress={() => handleAddWorkout(item)}>
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
                        <Text>Find inspiration for a healthy activity</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}
