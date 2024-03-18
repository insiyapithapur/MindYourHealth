import Header from "components/onboarding/header";
import image from "constants/image";
import { Stack } from "expo-router";
import React from "react";

export default function QuestionnaierLayout() {
  return (
    <Stack
      initialRouteName="Screen1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Screen1"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
