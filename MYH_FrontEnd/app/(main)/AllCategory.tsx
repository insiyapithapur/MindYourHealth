import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {Text,View,StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image} from 'react-native'

export default function AllCategory(){
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (text) => {
        setSearchText(text);
    };

    function handleBreakfast(){
        router.push('/Recepie/SeeAllBreakfast')
    }

    function handleLunch(){
        router.push('/Recepie/SeeAllLunch')
    }

    function handleSnack(){
        router.push('/Recepie/SeeAllSnack')
    }

    function handleDinner(){
        router.push('/Recepie/SeeAllDinner')
    }

    return(
        <View style={{
            flex : 1,
            // backgroundColor:'lightpink',
            backgroundColor: Colors.dark.background,
            flexDirection:'column',
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
                    <TouchableOpacity onPress={handleBreakfast}><Text style={{fontSize:22,color:'#875B70'}}>See all</Text></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                        <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                        <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                    </TouchableOpacity>
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
                 </ScrollView>
            </View>
            
            <View style={{flex:1,flexDirection:'column',marginTop:20,}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:28,}}>Meditation</Text>
                    <TouchableOpacity onPress={handleLunch}><Text style={{fontSize:22,color:'#875B70'}}>See all</Text></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row'}}>
                    <View style={styles.card}>
                        <Image source={require('../../assets/images/Lunch1.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                        <Text style={{fontSize:24,marginLeft:10}}>Oats</Text>
                        <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                    </View>
                    <View style={styles.card}>
                        <Image source={require('../../assets/images/BoiledVeggis.jpeg')} style={{width:150,height:120,borderRadius:10}}/>
                        <Text style={{fontSize:24,marginLeft:10}}>Boiled veggies</Text>
                        <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                    </View>
                    <View style={styles.card}>
                        <Image source={require('../../assets/images/dalRice.webp')} style={{width:150,height:120,borderRadius:10}}/>
                        <Text style={{fontSize:24,marginLeft:10}}>Dal rice</Text>
                        <Text style={{fontSize:20,marginLeft:10,marginTop:5}}>156 kcal</Text>
                    </View>
                </View>
                 </ScrollView>     
            </View>

            <View style={{flex:1,flexDirection:'column',marginTop:20,}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{fontSize:28,}}>Workout</Text>
                    <TouchableOpacity onPress={handleSnack}><Text style={{fontSize:22,color:'#875B70'}}>See all</Text></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row'}}>
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