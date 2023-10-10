import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Contact from "./screens/Contacts";
import AddContact from "./screens/AddContact";
import ContactDetails from "./screens/ContactDetails";

const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Contact}
          name="Contacts"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={AddContact}
          name="AddContact"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          component={ContactDetails}
          name="ContactDetails"
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
