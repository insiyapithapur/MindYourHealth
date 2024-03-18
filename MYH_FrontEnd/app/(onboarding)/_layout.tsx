import Header from "components/onboarding/header";
import image from "constants/image";
import { Stack } from "expo-router";
import React from "react";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "Screen1",
};

export default function OnboardingLayout() {
  return (
    <Stack
      initialRouteName="Screen1"
      screenOptions={{
        header: ({}) => {
          return (
            <Header
              image="../assets/images/splash.jpeg" // Add the necessary prop for image
            />
          );
        },
      }}
    >
      <Stack.Screen name="Screen1" />
      <Stack.Screen name="Screen2" />
    </Stack>
  );
}
