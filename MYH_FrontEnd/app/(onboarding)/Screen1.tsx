import React from "react";
import { Text, View } from "react-native";
import { COLORS, SIZES } from "constants/CustomColor";
import { Image } from "expo-image";
import { Link, Stack, router } from "expo-router";
import NextButton from "components/onboarding/NextButton";
import Colors from "constants/Colors";
const Screen1 = () => {
  return (
    <View style={{ 
            flex : 1, 
            justifyContent: "center" , 
            backgroundColor:Colors.dark.background,
            // backgroundColor:'yellow',
            }}>
      <View style={{ 
          flex:1,
          alignItems: "center",
          justifyContent:'center',
          // backgroundColor:'lightblue',
          }}>
        <Image
          source={require("../../assets/images/Congrats1.jpeg")}
          style={{
            height: 270,
            width: 240,
            borderRadius: 15,
            marginVertical: 10,
          }}
          onError={(error) => console.log("error", error)}
        />
        <Text style={{fontSize:32,}}>Congrats</Text>
        <Text style={{fontSize:32,}}>on taking the first step </Text>
        <Text style={{fontSize:32,}}>on your health !</Text>
      </View>
      <NextButton
        title="Continue"
        onPress={() => router.push("/(onboarding)/Screen2")}
      />
    </View>
  );
};

export default Screen1;
