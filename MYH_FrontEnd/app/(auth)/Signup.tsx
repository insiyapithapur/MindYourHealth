import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { COLORS } from "constants/CustomColor";
import { Text, View } from "components/Themed";
import CustomButton from "components/auth/CustomButton";
import { router} from "expo-router";
import { z } from "zod";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorModal from "components/auth/ErrorModal";

const Signup = ({}) => {
  // const [username, setUsername] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [showErrorModal,setShowErrorModal] = useState(false);
  const emailSchema = z.string().email({ message: "Invalid email address" });
  const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters" });
  const userNameSchema = z
    .string()
    .min(8, { message: "User name should not exceed 8 alphabates" });

  async function handleSignup(){
    try {
      const email_result = emailSchema.safeParse(email);
      const pass_result = passwordSchema.safeParse(password);
      const userNameResult = userNameSchema.safeParse(userName);
      
      // Your login logic here
      if (!email_result.success) {
        setEmailError("Invalid email address");
      }
      if (!pass_result.success) {
        setPasswordError("Password must be at least 6 characters");
      }
      if (!userNameResult.success) {
        setUserNameError("User name should not exceed 8 alphabates");
      }

      if (email_result.success && pass_result.success && userNameResult.success) {
        const userData = {
          email,
          password,
          username: userName,
        };
    
        console.log("User data:", userData);
          const response = await axios.post('http://192.168.240.61:8000/SignUp', 
                            userData,
                            {
                              headers: { "Content-Type": "application/json" },
                            });
          if (response.status === 200) {
            console.log('API response:', response.data);
            console.log('userID',response.data.userId);

            const userID = String(response.data.userId);
            console.log("userID",userID)
            const response_username = response.data.username;

            await AsyncStorage.setItem('userID', userID);
            await AsyncStorage.setItem('username',response_username);
            console.log("Login successful");
            router.replace("/(questionnaier)/Screen1")
        } else {
          console.error('API request failed with status:', response.status);
        }
      }
    } catch (error) {
      // Catch network errors
      console.error("Network Error:", error);
      // Add more specific catch blocks for different types of errors
      if (error.response.status === 500) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error:", error.response.data);
        setErrorMessage(error.response.data['message']); // Set error message
        setShowErrorModal(true); // Show modal
      }else if (error.response.status === 401) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error:", error.response.data);
        setErrorMessage(error.response.data['message']); // Set error message
        setShowErrorModal(true); // Show modal
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else if(error.message){
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }else{
        console.error('Error saving userID to AsyncStorage:', error);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ 
              flex: 1, 
              backgroundColor: COLORS.white,
              // backgroundColor:"yellow", 
            }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

              {showErrorModal && (
                <ErrorModal
                message={errorMessage}
                onClose={() => setShowErrorModal(false)} />
                  )}
      <View style={{ 
          flex: 1,
          // backgroundColor:"yellow",
           }}>
            <View>
          <Text
            style={{
              fontSize: 28,
              color: COLORS.black,
            }}
          >
            Register Yourself
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: COLORS.black,
            }}
          >
            Let's get to know each other!
          </Text>
        </View>
            <View style={{ marginVertical: 5 , alignItems:'center' }}>
              <Image
              source={require("../../assets/images/SignUp.jpeg")}
              style={{
                height: 150,
                width: 240,
                borderRadius: 15,
                marginVertical: 5,
              }}
              onError={(error) => console.log("error", error)}
            />
          </View>

        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              marginVertical: 8,
            }}
          >
            Email address
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              // borderColor: COLORS.black,
              // borderWidth: 1,
              backgroundColor : '#875B70',
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="white"
              keyboardType="email-address"
              style={{
                width: "100%",
                fontSize :16,
                color:"white"
              }}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(""); // Clear previous error
              }}
            />
          </View>
          {emailError && (
            <Text style={{ top: 5, color: "red" }}>{emailError}</Text>
          )}
        </View>

        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              marginVertical: 8,
              marginBottom : 5,
            }}
          >
            Username
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              // borderColor: COLORS.black,
              // borderWidth: 1,
              backgroundColor : '#875B70',
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 10,
            }}
          >
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="white"
              style={{
                width: "86%",
                fontSize:16,
                color:"white"
              }}
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
                setUserNameError(""); // Clear previous error
              }}
            />
          </View>
          {userNameError && (
            <Text style={{ top: 5, color: "red"}}>{userNameError}</Text>
          )}
        </View>

        <View style={{ marginBottom: 30}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "400",
              marginVertical: 12,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              // borderColor: COLORS.black,
              // borderWidth: 1,
              backgroundColor : '#875B70',
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="white"
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
                fontSize:16,
                color:"white"
              }}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(""); // Clear previous error
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color="white" />
              ) : (
                <Ionicons name="eye" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={{ top: 5, color: "red" }}>{passwordError}</Text>
          )}
        </View>

        <CustomButton title="Sign up" onPress={handleSignup} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 20, color: COLORS.black }}>
            Already have an account
          </Text>
          <Pressable onPress={() => router.back()}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.primary,
                fontWeight: "bold",
                textDecorationLine: "underline", // Add underline
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
