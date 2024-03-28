import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Colors from "constants/Colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {Text,View,StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image} from 'react-native'

export default function AllCategory(){
    const [searchText, setSearchText] = useState('');
    const [workoutData, setWorkoutData] = useState([]);
    const [yogaData , setYogaData] = useState([]);
    const [meditationData , setMeditationData] = useState([]);

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const response = await axios.get('http://192.168.240.61:8000/allworkout/?limit=5');
                setWorkoutData(response.data.workout_data);
                console.log("workout_data",workoutData)
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchWorkoutData();
    }, []);

    useEffect(() => {
        const fetchYogaData = async () => {
            try {
                const response = await axios.get('http://192.168.240.61:8000/allyoga/?limit=5');
                setYogaData(response.data.all_yoga);
                console.log("all_yoga",yogaData)
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchYogaData();
    }, []);

    useEffect(() => {
        const fetchMeditationData = async () => {
            try {
                const response = await axios.get('http://192.168.240.61:8000/allmeditation/?limit=5');
                setMeditationData(response.data.all_meditation);
                console.log("all_meditation",meditationData);
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchMeditationData();
    }, []);

    const handleInputChange = (text) => {
        setSearchText(text);
    };
    function handleYoga() {
        router.push('/(main)/SeeAllYoga');
    }

    function handleMeditation(){
        router.push('/(main)/SeeAllMeditation')
    }

    function handleWorkout(){
        router.push('/(main)/SeeAllWorkout');
    }

    return(
        <View style={{
            flex : 1,
            // backgroundColor:'lightpink',
            backgroundColor: Colors.dark.background,
            flexDirection:'column',
            marginBottom:5
        }}>
            <View style={{height:50,backgroundColor:"#875B70",opacity:0.7,borderRadius:10,flexDirection:'row',alignItems:'center',padding:5,marginBottom:10}}>
                <Ionicons name="search-sharp" size={30} color="black" />
                    <TextInput
                        style={{flex: 1, fontSize: 18, marginLeft: 10,}}
                        placeholder={searchText === '' ? 'Search Your Category' : ''}
                        placeholderTextColor="black"
                        onChangeText={handleInputChange}
                        value={searchText}
                    />
            </View>
            <ScrollView>
            <View style={{flex:1,flexDirection:'column',marginTop:20,}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:28,}}>Yoga</Text>
                    <TouchableOpacity onPress={handleYoga}><Text style={{fontSize:22,color:'#875B70'}}>See all</Text></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {yogaData.map((yoga, index) => (
                        <TouchableOpacity key={index} style={styles.card}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: yoga.image }} style={{ width: 150, height: 120, borderRadius: 10 }} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{yoga.name}</Text>
                                    <Feather name="bookmark" size={30} color="white" style={{ position: 'absolute', top: 10, right: 10 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>  
            </View>
            
            <View style={{flex:1,flexDirection:'column',marginTop:20,}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:28,}}>Meditation</Text>
                    <TouchableOpacity onPress={handleMeditation}><Text style={{fontSize:22,color:'#875B70'}}>See all</Text></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {meditationData.map((meditation, index) => (
                        <TouchableOpacity key={index} style={styles.card}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: meditation.image }} style={{ width: 150, height: 120, borderRadius: 10}} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{meditation.name}</Text>
                                    <Feather name="bookmark" size={30} color="white" style={{ position: 'absolute', top: 10, right: 10 }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>   
            </View>

            <View style={{flex:1,flexDirection:'column',marginTop:20,}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:28,}}>Workout</Text>
                    <TouchableOpacity onPress={handleWorkout}><Text style={{fontSize:22,color:'#875B70'}}>See all</Text></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {workoutData.map((workout, index) => (
                        <TouchableOpacity key={index} style={styles.card}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: workout.image_url }} style={{ width: 150, height: 120, borderRadius: 10 }} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{workout.name}</Text>
                                    <Feather name="bookmark" size={30} color="white" style={{ position: 'absolute', top: 10, right: 10 }} />
                                </View>
                                <View style={{flex:0.2,justifyContent:'flex-end',marginBottom:2}}>
                                <Text style={{ fontSize: 16, color: 'white',marginLeft: 10 }}>{workout.level}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>   
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#875B70',
        borderRadius: 10,
        width: 150,
        height: 200,
        marginRight: 10,
    },
})