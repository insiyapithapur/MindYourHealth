import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./_layout";
import {
  useRootNavigationState,
  Redirect,
  router,
  useSegments,
  useRouter,
} from "expo-router";
import { Platform } from "react-native";

export default function Page() {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();
  const user = null;
  React.useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    console.log("user", user);

    if (
      // If usernot signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the login page.
      router.replace("/(onboarding)/Screen1");
    } else if (user && inAuthGroup) {
      // Redirect away from the login page.
      router.replace("/(onboarding)/Screen1");
    }
  }, [user, segments, navigationState]);
}
