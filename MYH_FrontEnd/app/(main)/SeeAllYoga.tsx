import { AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Colors from "constants/Colors";
import { router } from "expo-router/build/imperative-api";
import React, { useEffect, useState } from "react";
import { View,Text, TextInput, TouchableOpacity, ScrollView,Image,StyleSheet } from 'react-native';

export default function SeeAllYoga(){
    const [searchText, setSearchText] = useState('');
    const [yogaData, setYogaData] = useState([]);

    useEffect(() => {
        const fetchYogaData = async () => {
            try {
                const response = await axios.get('http://192.168.240.61:8000/allyoga/');
                setYogaData(response.data.all_yoga);
                console.log("all_yoga",yogaData)
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchYogaData();
    }, []);

    const handleInputChange = (text) => {
        setSearchText(text);
    };
    function handleBack(){
        router.replace('/(main)/AllCategory')
    }
    return(
        <View style={{
            flex : 1,
            // backgroundColor:'lightpink',
            backgroundColor: Colors.dark.background,
            flexDirection:'column',
        }}>
            <TouchableOpacity onPress={handleBack} style={{marginBottom:5}}>
                    <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>

            <View style={{height:50,backgroundColor:"#875B70",opacity:0.7,borderRadius:10,flexDirection:'row',alignItems:'center',padding:5,marginBottom:5}}>
                <Ionicons name="search-sharp" size={30} color="black" />
                    <TextInput
                        style={{flex: 1, fontSize: 18, marginLeft: 10,}}
                        placeholder={searchText === '' ? 'Search Your Yoga' : ''}
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
                <Text style={{fontSize:32}}>Yoga</Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={styles.column}>
                    {yogaData.slice(0, Math.ceil(yogaData.length / 2)).map((yoga, index) => (
                        <View style={styles.card} key={index}>
                            <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: yoga.image }} style={{ width: 150, height: 120, borderRadius: 10 }} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{yoga.name}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    </View>
                    <View style={styles.column}>
                    {yogaData.slice(Math.ceil(yogaData.length / 2)).map((yoga, index) => (
                        <View style={styles.card} key={index}>
                        <View style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <Image source={{ uri: yoga.image}} style={{ width: 150, height: 120, borderRadius: 10 }} />
                                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>{yoga.name}</Text>
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