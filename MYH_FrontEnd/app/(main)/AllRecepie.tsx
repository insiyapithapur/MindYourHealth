import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Colors from "constants/Colors";
import { router } from "expo-router/build/imperative-api";
import React, { useEffect, useState } from "react";
import { View,Text, TextInput, TouchableOpacity, ScrollView,Image,StyleSheet } from 'react-native';

export default function AllRecepie(){
    const [searchText, setSearchText] = useState('');
    const [recepiedata, setRecepieData] = useState([]);

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const response = await axios.get('http://192.168.240.61:8000/allrecepie/');
                setRecepieData(response.data.all_recepie);
                console.log("workout_data",recepiedata)
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchWorkoutData();
    }, []);

    const handleInputChange = (text) => {
        setSearchText(text);
    };
    
    return(
        <View style={{
            flex : 1,
            // backgroundColor:'lightpink',
            backgroundColor: Colors.dark.background,
            flexDirection:'column',
        }}>
            <View style={{height:50,backgroundColor:"#875B70",opacity:0.7,borderRadius:10,flexDirection:'row',alignItems:'center',padding:5,marginBottom:5}}>
                <Ionicons name="search-sharp" size={30} color="black" />
                    <TextInput
                        style={{flex: 1, fontSize: 18, marginLeft: 10,}}
                        placeholder={searchText === '' ? 'Search Your Recpie' : ''}
                        placeholderTextColor="black"
                        onChangeText={handleInputChange}
                        value={searchText}
                    />
            </View>

            <View style={{
                // backgroundColor:"yellow",
                height:40,
                flexDirection:'row',
                alignItems:'center'
            }}>
                <Text style={{fontSize:32}}>Recepie</Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={styles.column}>
                    {recepiedata.slice(0, Math.ceil(recepiedata.length / 2)).map((recepie, index) => (
                        <View style={styles.card} key={index}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: recepie.image }} style={{ width: 150, height: 120, borderRadius: 10 }} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{recepie.title}</Text>
                                    <Feather name="bookmark" size={30} color="white" style={{ position: 'absolute', top: 10, right: 10 }} />
                                </View>
                                <View style={{flex:0.2,justifyContent:'flex-end',marginBottom:2}}>
                                    <Text style={{ fontSize: 16, color: 'white',marginLeft: 10 }}>{recepie.calories_per_serving}kcal</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    </View>
                    <View style={styles.column}>
                    {recepiedata.slice(Math.ceil(recepiedata.length / 2)).map((recepie, index) => (
                        <View style={styles.card} key={index}>
                        <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: recepie.image }} style={{ width: 150, height: 120, borderRadius: 10 }} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{recepie.title}</Text>
                                    <Feather name="bookmark" size={30} color="white" style={{ position: 'absolute', top: 10, right: 10 }} />
                                </View>
                                <View style={{flex:0.2,justifyContent:'flex-end',marginBottom:2}}>
                                    <Text style={{ fontSize: 16, color: 'white',marginLeft: 10 }}>{recepie.calories_per_serving}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    </View>
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
        marginVertical:10,
    },
    // card: {
        // backgroundColor: '#875B70',
        // borderRadius: 10,
        // width: 150,
        // height: 200,
        // marginVertical: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    // },
    column: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})