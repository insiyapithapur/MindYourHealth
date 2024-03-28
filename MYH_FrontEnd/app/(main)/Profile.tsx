import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "constants/Colors";
import { COLORS } from "constants/CustomColor";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import PopupModal from "./PopupModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [defaultValue, setdefaultValue] = React.useState();
  const [userID, setUserID] = useState("");
  const [username,setusername] = useState("")
  const [userData, setUserData] = useState("");
  const [refreshing,setRefreshing] = useState(false);
  
  const fetchUserData = async () => {
    const storedUserID = await AsyncStorage.getItem('userID');
    const storedUsername = await AsyncStorage.getItem('username');
    setUserID(storedUserID);
    setusername(storedUsername);
    console.log("storeduserID",storedUserID);
    const response = await axios.get(`http://192.168.240.61:8000/profile/${storedUserID}`);
    console.log("API response:", response.data);
    setUserData(response.data['User Information']);
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  },[]); // Run the effect whenever userID changes

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData().then(() => setRefreshing(false));
  };
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchUserData();
    // }, 500); // Refresh every 60 seconds (adjust interval as needed)

    // return () => clearInterval(intervalId); // Clean up interval on unmount
  // }, []); // Run

  console.log("userID in profile",userID);
  console.log("username in profile",username);
  console.log("userData", userData);

  const handleRightButtonClick = (title) => {
    setPopupTitle(title);
      // Set default value based on the title or any other condition
      if (title === "Goal") {
        setdefaultValue(userData.goal); // Set the default value based on userData
      } else if (title === "Goal Weight") {
        setdefaultValue(userData.targetWeight); // Set the default value based on userData
      }else if (title === "Current Weight") {
        setdefaultValue(userData.currentWeight); // Set the default value based on userData
      }else if (title === "Height") {
        setdefaultValue(userData.height); // Set the default value based on userData
      }else if (title === "Age") {
        setdefaultValue(userData.age.toString()); // Set the default value based on userData
      }else if (title === "Gender") {
        setdefaultValue(userData.gender); // Set the default value based on userData
      }else if (title === "Activity Level") {
        setdefaultValue(userData.activitylevel); // Set the default value based on userData
      }
      setModalVisible(true);
  };

  return(
        <View style={{
          // backgroundColor:"yellow",
          backgroundColor: Colors.dark.background,
          flexDirection:'column',
          flex:1,
        }}>
            <ScrollView
              style={{ flex: 1 }}
              // refreshControl={
              //   // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            >
            <View style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between', // Align items horizontally
              alignItems: 'center',
            }}>
              <PopupModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={() => setModalVisible(false)} title={popupTitle} defaultValue={defaultValue} userID={userID}/>
              <Text style={{ fontSize: 32 }}>Profile</Text>
              {/* <TouchableOpacity>
                  <Entypo name="dots-three-vertical" size={30} color="black" />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={onRefresh}>
            <AntDesign name="reload1" size={30} color="black" />
          </TouchableOpacity>
            </View>

            <View style={{
              // backgroundColor: 'yellow',
              flexDirection: 'column',
              flex: 1.2,
              paddingHorizontal: 5,
              paddingVertical: 5,
              marginTop:20,
              marginBottom:0,
            }}>
              <View style={{marginBottom:10}}>
                <Text style={{ fontSize: 28,}}>Your Goals</Text>
              </View>
              <View style={{ 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' ,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor:'#875B70',}}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black',flexDirection:'row',justifyContent:'space-between' }}>
                      <Text style={{ fontSize: 22 , padding:5 ,color:'white'}}>Goal</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.goal}</Text>
                          <TouchableOpacity onPress={() => handleRightButtonClick("Goal")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                          </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={{ fontSize: 22 , padding:5 , color:'white'}}>Goal Weight</Text>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.targetWeight} kg</Text>
                            <TouchableOpacity onPress={() => handleRightButtonClick("Goal Weight")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                            </TouchableOpacity>
                          </View>
                    </View>
              </View>
            </View>

            <View style={{
              // backgroundColor: 'lightblue',
              flexDirection: 'column',
              flex: 4,
              paddingHorizontal: 5,
              paddingVertical: 5,
              marginTop:20,
              marginBottom:0,
            }}>
              <View style={{marginBottom:10}}>
                <Text style={{ fontSize: 28,}}>Details</Text>
              </View>
              <View style={{ 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' ,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderRadius: 10,
                  backgroundColor:'#875B70',}}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' , padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Email</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.email}</Text>
                      </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' , padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Username</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.username}</Text>
                      </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' , padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Current Weight</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.currentWeight} kg</Text>
                            <TouchableOpacity onPress={() => handleRightButtonClick("Current Weight")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                            </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' , padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Height</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.height} cm</Text>
                            <TouchableOpacity onPress={() => handleRightButtonClick("Height")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                            </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' , padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Age</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.age} years</Text>
                            <TouchableOpacity onPress={() => handleRightButtonClick("Age")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                            </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' , padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Gender</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.gender}</Text>
                            <TouchableOpacity onPress={() => handleRightButtonClick("Gender")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                            </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{padding:5,flexDirection:'row',justifyContent: 'space-between' ,}}>
                      <Text style={{ fontSize: 22 ,marginBottom:5 , color:'white'}}>Activity Level</Text>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{ fontSize: 18 , padding:5 , color:'white'}}>{userData.activitylevel}</Text>
                            <TouchableOpacity onPress={() => handleRightButtonClick("Activity Level")}>
                              <AntDesign name="right" size={24} color="white" style={{marginLeft:5}} />
                            </TouchableOpacity>
                      </View>
                    </View>
              </View>
            </View>
        </ScrollView>
        </View>
  );
}