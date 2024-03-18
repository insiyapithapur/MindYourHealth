import React from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "components/useColorScheme";
import Colors from "constants/Colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(onboarding)",
};
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          initialRouteName="(onboarding)"
          screenOptions={{
            statusBarStyle: "dark",
            contentStyle: {
              padding: 15,
              paddingBottom: 20,
              backgroundColor: Colors.dark.background,
            },
          }}
        >
          <Stack.Screen
            name="(onboarding)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(questionnaier)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(main)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
