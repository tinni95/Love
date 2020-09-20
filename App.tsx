import React from "react";
import {
  useFonts,
  LobsterTwo_400Regular,
  LobsterTwo_400Regular_Italic,
  LobsterTwo_700Bold,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

import { AppLoading } from "expo";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import Results from "./pages/Results";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function App() {
  let [fontsLoaded] = useFonts({
    LobsterTwo_400Regular,
    LobsterTwo_400Regular_Italic,
    LobsterTwo_700Bold,
    LobsterTwo_700Bold_Italic,
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardShadowEnabled: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{ cardStyleInterpolator: forFade }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}