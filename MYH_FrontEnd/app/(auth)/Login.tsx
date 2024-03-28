import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { COLORS } from "constants/CustomColor";
import CustomButton from "components/auth/CustomButton";
import NextButton from "components/onboarding/NextButton";
import { z } from "zod";
import { Redirect, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorModal from 'components/auth/ErrorModal';

const Login = ({}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const [showErrorModal,setShowErrorModal] = useState(false);

  const emailSchema = z.string().email({ message: "Invalid email address" });
  const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters" });

  const handleLogin = async () => {
    try {
      const email_result = emailSchema.safeParse(email);
      const pass_result = passwordSchema.safeParse(password);
      
      // Your login logic here

      if (!email_result.success) {
        setEmailError("Invalid email address");
      }
      if (!pass_result.success) {
        setPasswordError("Invalid password");
      }
      if (email_result.success && pass_result.success) {
        console.log("hello");
        console.log("email",email);
        console.log("password",password);
        const userData = {
          email,
          password
        };
        console.log("userData",userData);
        const response = await axios.post('http://192.168.240.61:8000/Login', 
                        userData,
                        {
                          headers: { "Content-Type": "application/json" },
                        });
        if (response.status === 200) {
          console.log('API response:', response.data);
          console.log('userID',response.data.user_id);
          console.log("username",response.data.username);

          const userID = String(response.data.user_id);
          const response_username = response.data.username;

          await AsyncStorage.setItem('userID', userID);
          await AsyncStorage.setItem('username', response_username);
          console.log("login id",await AsyncStorage.getItem('userID'))
          console.log("username login",await AsyncStorage.getItem('username'))
          console.log("Login successful");
          router.replace('/(main)/home_Screen');
        } else if(response.status === 500)  {
          console.log("Error 500",response.data);
          setErrorMessage("Email doesn't exist, please register"); // Set error message
          setShowErrorModal(true); // Show modal
          console.log(showErrorModal);
        }
        // router.replace("/(main)/home_Screen");
      }
    } catch (error) {
      console.error("Network Error:", error);
      if (error.response.status === 500) {
          console.error("API Error:", error.response.data);
          setErrorMessage(error.response.data['message']); // Set error message
          setShowErrorModal(true); // Show modal
          console.log(showErrorModal);
      }else if (error.response.status === 400) {
          console.error("API Error:", error.response.data);
          setErrorMessage(error.response.data['message']); // Set error message
          setShowErrorModal(true); // Show modal
          console.log(showErrorModal);
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
    <SafeAreaView style={{ 
        flex: 1, 
        backgroundColor: COLORS.white,
        //  backgroundColor : 'yellow',
         justifyContent:'center',
         }}>
                  {showErrorModal && (
                <ErrorModal
                message={errorMessage}
                onClose={() => setShowErrorModal(false)} />
                  )}
                
      <View style={{
                  flex: 1,
                  justifyContent: "center",}}
        >

          <View style={{ marginVertical: 12, alignItems: 'center' }}>
            <Image
              source={require("../../assets/images/Login.jpeg")}
              style={{
                height: 270,
                width: 240,
                borderRadius: 15,
                marginVertical: 5,
              }}
              onError={(error) => console.log("error", error)} />
            <Text
              style={{
                fontSize: 32,
                // marginVertical: 10,
                color: COLORS.black,
              }}
            >
              Hi Welcome Back !
            </Text>
          </View>
            {/* <View style={{ marginVertical: 15 , alignItems:'center' }}>
      <Text
        style={{
          fontSize: 32,
          // marginVertical: 10,
          color: COLORS.black,
        }}
      >
        Hi Welcome Back ! 👋
      </Text>
    </View> */}

            {/* Email Input */}
            <View style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 24, fontWeight: "200", marginVertical: 8, }}>
                Email address
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  // borderColor: COLORS.black,
                  backgroundColor: '#875B70',
                  // borderWidth: 1,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}
              >
                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  style={{ width: "100%", fontSize: 16, color: "white" }}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError(""); // Clear previous error
                  } } />
              </View>
              {emailError && (
                <Text style={{ top: 5, color: "red" }}>{emailError}</Text>
              )}
            </View>

            {/* password input  */}

            <View style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 24, fontWeight: "400", marginVertical: 8 }}>
                Password
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 48,
                  // borderColor: COLORS.black,
                  // borderWidth: 1,
                  backgroundColor: '#875B70',
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
                  style={{ width: "100%", fontSize: 16, color: "white" }}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(""); // Clear previous error
                  } } />
                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{ position: "absolute", right: 12 }}
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

            <CustomButton title="Login" onPress={handleLogin} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 22,
              }}
            >
              <Text style={{ fontSize: 20, color: COLORS.black }}>
                Don't have an account ?{" "}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/Signup")}>
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.primary,
                    textDecorationLine: "underline", // Add underline
                    marginLeft: 6,
                  }}
                >
                  Register
                </Text>
              </Pressable>
            </View>
          </View>
    </SafeAreaView>
  );
};

export default Login;
