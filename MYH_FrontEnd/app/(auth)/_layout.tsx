import Header from "components/onboarding/header";
import image from "constants/image";
import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
