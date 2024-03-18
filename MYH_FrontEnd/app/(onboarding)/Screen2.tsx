import React from "react";
import { Text, View } from "react-native";
import { COLORS, SIZES } from "constants/CustomColor";
import { Image } from "expo-image";
import { Link, Stack, router } from "expo-router";
import NextButton from "components/onboarding/NextButton";
import Colors from "constants/Colors";
const Screen2 = () => {
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
          source={require("../../assets/images/Congrats23.jpeg")}
          style={{
            height: 270,
            width: 240,
            borderRadius: 15,
            marginVertical: 10,
          }}
          onError={(error) => console.log("error", error)}
        />
        <Text style={{fontSize:32,}}>When it comes to </Text>
        <Text style={{fontSize:32,}}>nutrition ,finding what works for you makes all </Text>
        <Text style={{fontSize:32,}}>the difference.</Text>
        {/* <Text style={{fontSize:32,}}>on taking the first step with mind your health !</Text> */}
      </View>
      <NextButton
        title="Continue"
        onPress={() => router.push("/(auth)/Login")}
      />
    </View>
  );
};

export default Screen2;
