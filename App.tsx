import React from "react";
import {
  useFonts,
  LobsterTwo_400Regular,
  LobsterTwo_400Regular_Italic,
  LobsterTwo_700Bold,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { BalooTammudu2_700Bold } from "@expo-google-fonts/baloo-tammudu-2";

import { AppLoading } from "expo";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import Results from "./pages/Results";
import PlayContext from "./play.context";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export default function App() {
  const [play, setPlay] = React.useState(0);
  const [sound, setSound] = React.useState(true);
  let [fontsLoaded] = useFonts({
    LobsterTwo_400Regular,
    LobsterTwo_400Regular_Italic,
    LobsterTwo_700Bold,
    LobsterTwo_700Bold_Italic,
    BalooTammudu2_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <PlayContext.Provider
      value={{
        increment: () => setPlay(play + 1),
        play,
        reset: () => setPlay(0),
        sound,
        toggleSound: () => setSound(!sound),
      }}
    >
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
    </PlayContext.Provider>
  );
}
