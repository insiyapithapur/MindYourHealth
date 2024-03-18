import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from 'constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';

export default function Screen1() {
  const [goals, setGoals] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [targetWeightUnit, setTargetWeightUnit] = useState('kgs');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [currentWeight, setCurrentWeight] = useState('');
  const [currentWeightUnit, setCurrentWeightUnit] = useState('kgs');
  const [userID, setUserID] = useState("");
  const [username, setusername] = useState("");

  useEffect(() => {
    const fetchUserID = async () => {
      const storedUserID = await AsyncStorage.getItem('userID');
      const storedusername = await AsyncStorage.getItem('username');
      setUserID(storedUserID);
      setusername(storedusername);
    };
    fetchUserID();
  }, []);
  console.log("userID",userID);
  console.log("username",username);
  const handleGoalSelection = (selectedGoal) => {
    setGoals(selectedGoal);
  };
  const handleTargetWeightUnitChangeToKgs = () => {
    setTargetWeightUnit('kgs');
  };

  const handleTargetWeightUnitChangeToLbs = () => {
    setTargetWeightUnit('lbs');
  };

  const handleCurrentWeightUnitChangeToKgs = () => {
    setCurrentWeightUnit('kgs');
  };

  const handleCurrentWeightUnitChangeToLbs = () => {
    setCurrentWeightUnit('lbs');
  };
  const handleHeightUnitChangeTocm = () => {
    setHeightUnit('cm');
  };

  const handleHeightUnitChangeTofeet = () => {
    setHeightUnit('feet');
  };
  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSave = () => {
    // Save the data to backend or perform other actions
    // console.log('Goals:', goals);
    // console.log('Target Weight:', targetWeight + ' ' + targetWeightUnit);
    // console.log('Gender:', gender);
    // console.log('Age:', age);
    // console.log('Height:', height);
    // console.log('Current Weight:', currentWeight + ' ' + currentWeightUnit);
    const userData = {
      goals: goals,
      targetWeight: targetWeight + ' ' + targetWeightUnit,
      gender: gender,
      age: age,
      height: height + ' ' + heightUnit,
      currentWeight: currentWeight + ' ' + currentWeightUnit
    };
    
    // Save the data to backend or perform other actions
    console.log('User Data:', userData);
    router.push({pathname : '/(questionnaier)/Screen2',params : userData});
  };

  return (
        <KeyboardAvoidingView style={{ flex: 1, paddingTop: 10, backgroundColor: Colors.dark.background, }}>
          <ScrollView style={{ flex: 1.1, paddingTop: 10, }}>
            <Text style={styles.title}>Goal</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, goals === 'Lose Weight' && styles.selectedButton]}
                onPress={() => handleGoalSelection('Lose Weight')}
              >
                <Text style={styles.buttonText}>Lose Weight</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, goals === 'Maintain Weight' && styles.selectedButton]}
                onPress={() => handleGoalSelection('Maintain Weight')}
              >
                <Text style={styles.buttonText}>Maintain Weight</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, goals === 'Gain Weight' && styles.selectedButton]}
                onPress={() => handleGoalSelection('Gain Weight')}
              >
                <Text style={styles.buttonText}>Gain Weight</Text>
              </TouchableOpacity>
            </View>


            <Text style={[styles.title, { marginTop: 10 }]}>Target Weight</Text>
            <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 10, justifyContent: 'space-evenly' }}>
              <TextInput
                style={{
                  borderColor: '#ccc',
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  fontSize: 18,
                  paddingVertical: 5,
                  marginRight: 15,
                }}
                placeholder="Enter target weight"
                value={targetWeight}
                onChangeText={text => setTargetWeight(text)}
                keyboardType="numeric" />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={handleTargetWeightUnitChangeToKgs}
                  style={[{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: '#875B70',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginLeft: 15,
                    marginRight: 10,
                  }, targetWeightUnit === 'kgs' && { backgroundColor: '#C66895', }]}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 10, color: 'white',}}>kgs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTargetWeightUnitChangeToLbs}
                  style={[{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: '#875B70',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginLeft: 10,
                  }, targetWeightUnit === 'lbs' && { backgroundColor: '#C66895', }]}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 10, color: 'white',}}>lbs</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.title, { marginTop: 10 }]}>Gender</Text>
            <View style={{ borderRadius: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity onPress={() => handleGenderSelection('Female')}
                style={[{
                  borderWidth: 2,
                  borderColor: '#ccc',
                  backgroundColor: '#875B70',
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  marginLeft: 10,
                },
                gender === 'Female' && { backgroundColor: '#C66895', }]}>
                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: 'white',}}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGenderSelection('Male')}
                style={[{
                  borderWidth: 2,
                  borderColor: '#ccc',
                  backgroundColor: '#875B70',
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  marginLeft: 10,
                },
                gender === 'Male' && { backgroundColor: '#C66895', }]}>
                <Text style={{ fontSize: 18, paddingHorizontal: 10,color: 'white', }}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGenderSelection('Others')}
                style={[{
                  borderWidth: 2,
                  borderColor: '#ccc',
                  backgroundColor: '#875B70',
                  borderRadius: 5,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  marginLeft: 10,
                },
                gender === 'Others' && { backgroundColor: '#C66895', }]}>
                <Text style={{ fontSize: 18, paddingHorizontal: 10,color: 'white', }}>Others</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={styles.title}>Age</Text>
              <View style={{ marginLeft: 30, marginBottom: 10, justifyContent: 'space-evenly' }}>
                <TextInput
                  style={{
                    borderColor: '#ccc',
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    fontSize: 18,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    width: 80,
                    // marginRight:15,
                  }}
                  placeholder="Enter age"
                  value={age}
                  onChangeText={text => setAge(text)}
                  keyboardType="numeric" />
              </View>
            </View>

            {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={styles.title}>Height</Text>
              <View style={{ marginLeft: 30, marginBottom: 10, justifyContent: 'space-evenly' }}>
                <TextInput
                  style={{
                    borderColor: '#ccc',
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    fontSize: 18,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    width: 105,
                    // marginRight:15,
                  }}
                  placeholder="Enter Height"
                  value={height}
                  onChangeText={text => setHeight(text)}
                  keyboardType="numeric" />
              </View>
            </View> */}
            <Text style={[styles.title, { marginTop: 10 }]}>Height</Text>
            <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 10, justifyContent: 'space-evenly' }}>
              <TextInput
                style={{
                  borderColor: '#ccc',
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  fontSize: 18,
                  paddingVertical: 5,
                  marginRight: 15,
                }}
                placeholder="Enter Height"
                value={height}
                onChangeText={text => setHeight(text)}
                keyboardType="numeric" />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={handleHeightUnitChangeTocm}
                  style={[{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: '#875B70',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginLeft: 15,
                    marginRight: 10,
                  }, heightUnit === 'cm' && { backgroundColor: '#C66895', }]}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 10, color: 'white',}}>cm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHeightUnitChangeTofeet}
                  style={[{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: '#875B70',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginLeft: 10,
                  }, heightUnit === 'feet' && { backgroundColor: '#C66895', }]}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 10, color: 'white',}}>feet</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.title, { marginTop: 10 }]}>Current Weight</Text>
            <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 10, justifyContent: 'space-evenly' }}>
              <TextInput
                style={{
                  borderColor: '#ccc',
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  fontSize: 18,
                  paddingVertical: 5,
                  marginRight: 15,
                }}
                placeholder="Enter Current weight"
                value={currentWeight}
                onChangeText={text => setCurrentWeight(text)}
                keyboardType="numeric" />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={handleCurrentWeightUnitChangeToKgs}
                  style={[{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: '#875B70',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginLeft: 15,
                    marginRight: 10,
                  }, currentWeightUnit === 'kgs' && { backgroundColor: '#C66895', }]}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 10, color: 'white',}}>kgs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCurrentWeightUnitChangeToLbs}
                  style={[{
                    borderWidth: 2,
                    borderColor: '#ccc',
                    backgroundColor: '#875B70',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    marginLeft: 10,
                  }, currentWeightUnit === 'lbs' && { backgroundColor: '#C66895', }]}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 10,color: 'white', }}>lbs</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
    <TouchableOpacity onPress={handleSave}
      style={{
        paddingTop: 10,
        marginTop: 10,
        justifyContent:'space-between',
        backgroundColor: '#875B70',
        paddingVertical: 15,
        borderRadius: 10,
        // alignItems: 'flex-end',
        flexDirection:'row'
      }}>
        <View></View>
        <View style={{alignItems: 'center',justifyContent:'center'}}>
         <Text style={styles.saveButtonText}>Next</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center',}}>
        <Ionicons
          name="arrow-forward-outline"
          size={30}
          color="white"
        />
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  unitText: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems:'flex-start',
    // justifyContent: 'space-between',
    // marginBottom: 5,
  },
  button: {
    backgroundColor: '#875B70',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom:10,
  },
  selectedButton: {
    backgroundColor: '#C66895',
  },
  buttonText: {
    fontSize:18,
    color: 'white',
    padding:5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 24,
  },
});
