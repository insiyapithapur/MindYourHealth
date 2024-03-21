import { Stack, Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import HomeScreen from "./home_Screen";
import Profile from "./Profile";
import AllRecepie from "./AllRecepie";
import AllCategory from "./AllCategory";
import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

const _layout = () => {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="home_Screen"/>
    // </Stack>
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home_Screen"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="AllCategory"
        options={{
          headerShown: false,
          title: 'Category',
          tabBarIcon: ({ color }) => <MaterialIcons name="work-outline" size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="AllRecepie"
        options={{
          headerShown: false,
          title: 'Recepie',
          tabBarIcon: ({ color }) => <Ionicons name="fast-food-outline" size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Saved"
        options={{
          headerShown: false,
          title: 'Saved',
          tabBarIcon: ({ color }) => <Feather name="bookmark" size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color="black" />,
        }}
      />

      <Tabs.Screen
        // Name of the route to hide.
        name="AddDinner"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="AddLunch"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="AddMeal"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="AddSnack"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="Searchbreakfast"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="Searchdinner"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="Searchlunch"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="SearchMeal"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="Searchsnack"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="SearchWorkout"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="SeeAllBreakfast"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="SeeAllDinner"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="SeeAllLunch"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="SeeAllSnack"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="TrackCycle"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="TrackWorkout"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="TraclMeal"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="PopupModal"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="AddWorkout"
        options={{
          headerShown: false,
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
    </Tabs>
    
  );
};

export default _layout;

const styles = StyleSheet.create({});
