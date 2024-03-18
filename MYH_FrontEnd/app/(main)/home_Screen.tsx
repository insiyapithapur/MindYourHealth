import React ,{useState , useEffect} from 'react';
import { Text, View ,StyleSheet, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Colors from 'constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts, MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';
import {CircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({MajorMonoDisplay_400Regular,});
  const [currentDate, setCurrentDate] = useState('');
  const [userID, setUserID] = useState("");
  const [username , setUsername] =  useState("");
  
  const totalKcal = 1200
  const currentKcal = 100
  const remainingKcal = totalKcal - currentKcal

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem('userID');
      const storedUsername = await AsyncStorage.getItem('username');
      setUserID(storedUserID);
      setUsername(storedUsername);
    };
    fetchUserID();
  }, []);

  console.log("userID",userID);
  console.log("username",username);

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  function handleTrackMeal(){
    router.push('/(main)/TraclMeal')
  }

  function handleTrackCycle(){
    router.push('/(main)/TrackCycle')
  }

  function handleTrackWorkout(){
    router.push('/(main)/TrackWorkout')
  }

  // function handleRcepie(){
  //   router.push('/(main)/AllRecepie')
  // }

  // function handleCategory(){
  //   router.push('/(main)/AllCategory')
  // }

  // function handleSaved(){
  //   router.push('/(main)/Saved')
  // }

  // function handleProfile(){
  //   router.push('/(main)/Profile')
  // }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.box1}>
        <Text style={{
          fontSize:36,
          fontFamily: 'MajorMonoDisplay_400Regular',
        }}>MYN</Text>
      </View>

      <View style={styles.box2}>
        <Text style={{fontSize:20,color:"#000000"}}>{currentDate}</Text>
        <Text style={{fontSize:28,color:"#851149"}}>Hello {username} !</Text>
        <Text style={{fontSize:20,color:"#000000"}}>Let’s check your todays status:</Text>
      </View>

      <View style={styles.box3}>
        {/* <Text>Box 3</Text> */}
        <CircularProgress
          size={250}
          width={15}
          fill={(currentKcal / totalKcal) * 100} // replace currentKcal and totalKcal with actual values
          tintColor="#ba7894"
          backgroundColor="#eed7e1"
          rotation={0}
          lineCap="round"
          style={{backgroundColor:'#875B70',borderRadius:150}}>
          {
            () => (
              <View style={{ alignItems: 'center'}}>
                <Text style={{ fontSize: 20,color:'#FFFFFF' }}>Total kcal: {totalKcal}</Text>
                <Text style={{ fontSize: 26 , color:'#FFFFFF'}}>Left kcal: {remainingKcal}</Text>
              </View>
              // <Text style={{fontSize:20}}>{remainingKcal} kcal left</Text> // replace currentKcal and totalKcal with actual values
              
            )
          }
        </CircularProgress>
      </View>
      <View style={styles.box4}>
            <View style={styles.cardContainer}>
              <View style={[styles.card,{backgroundColor: '#875B70'}]}>
              {/* <ImageBackground 
                  source={require('../../assets/images/trackMeal.jpg')} 
                  style={styles.card}
                  imageStyle={{ borderRadius: 10, opacity: 0.7 }}
                > */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 32 , color:"white"}}>Track Meal</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={handleTrackMeal}>
                      <MaterialIcons name="lunch-dining" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                {/* </ImageBackground> */}
              </View>
              <View style={[styles.card,{marginTop:10,backgroundColor: '#875B70'}]}>
              {/* <ImageBackground 
                  source={require('../../assets/images/TrackWorkout.jpg')} 
                  style={styles.card}
                  imageStyle={{ borderRadius: 10, opacity: 0.7 }} */}
                {/* > */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 32 , color:"white"}}>Track Activity</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={handleTrackWorkout}>
                        <FontAwesome5 name="dumbbell" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                {/* </ImageBackground> */}
              </View>
              <View style={[styles.card, { backgroundColor: '#875B70' , marginTop:10}]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <View style={{ marginLeft: 10 }}>
                    <Text style={{fontSize:32,color:"white"}}>Track Cycle</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={handleTrackCycle}>
                          <AntDesign name="calendar" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
              </View>
              {/* <View style={styles.card}>
                <Text>Track </Text>
              </View> */}
            </View>
      </View>
      {/* <View style={styles.box5}> */}
            {/* <TouchableOpacity onPress={handleRcepie}>
              <Text>Recepie</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCategory}>
              <Text>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaved}>
              <Text>Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile}>
              <Text>Profile</Text>
            </TouchableOpacity> */}
      {/* </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', // Vertical arrangement
      backgroundColor: Colors.dark.background,
    },
    box1: {
      height : 40,
      // backgroundColor:"lightgreen",
      alignItems:"flex-end",
      justifyContent: 'flex-end',
      marginRight:20,

    },
    box2: {
      flex:0.9,
      // backgroundColor:"lightpink",
      marginTop : 5
    },
    box3: {
        flex:2.5,
        // height:100,
        // marginTop : 5,
        // backgroundColor:"violet",
        paddingTop:10,
        justifyContent:'center',
        alignItems:'center'
      },
    box4: {
        flex: 3,
        // backgroundColor:"yellow",
        flexDirection : 'column',
        marginTop:10,
      },
      cardContainer: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // paddingHorizontal: 10,
      },
      card: {
        width: '100%', // Adjust as per your requirement
        height: 100,
        backgroundColor: 'white',
        // marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      cardImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
      },
    box5: {
        flex: 0.5,
        backgroundColor: 'lightblue',
        justifyContent : 'center',
        alignItems: 'center',
        flexDirection:'row'
      },
  });
  