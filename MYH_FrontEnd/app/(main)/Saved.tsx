import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { router } from "expo-router/build/imperative-api";
import React, { useState } from "react";
import { View,Text, TextInput, TouchableOpacity, ScrollView,Image,StyleSheet } from 'react-native';

export default function Saved(){
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (text) => {
        setSearchText(text);
    };
    function handleBack(){
        router.replace('/(main)/home_Screen')
    }
    return(
        <View style={{
            flex : 1,
            // backgroundColor:'lightpink',
            backgroundColor: Colors.dark.background,
            flexDirection:'column',
        }}>
            <View style={{
                // backgroundColor:"yellow",
                height:40,
                flexDirection:'row',
                alignItems:'center',
            }}>

            <TouchableOpacity onPress={handleBack} style={{marginBottom:5}}>
                    <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>

                <Text style={{fontSize:32,marginLeft:120}}>Saved</Text>
            </View>

            <ScrollView style={{
                flex:1,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={styles.column}>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                            <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                            <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                        </View>
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