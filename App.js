import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import {
  useFonts,
  LobsterTwo_400Regular,
  LobsterTwo_400Regular_Italic,
  LobsterTwo_700Bold,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import {
  BoldOpen,
  Bold,
  LightOpen,
} from "./components/StyledText/StyledText.components";
import { LinearGradient } from "expo-linear-gradient";
import { AppLoading } from "expo";
import AnimateNumber from "react-native-animate-number";
import LoveTextInput from "./components/LoveTextInput/LoveTextInput.component";
import Spacer from "./components/Spacer/Spacer";
import LoveButton from "./components/LoveButton/LoveButton.component";
import Axios from "axios";

const { width, height } = Dimensions.get("window");

const endY = height * -1;
const startX = width;

export default function App() {
  const [name, setName] = useState(null);
  const [partner, setPartner] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const animatedNumber = (num) => {
    return (
      <BoldOpen style={{ fontSize: 50, textAlign: "center", color: "white" }}>
        <AnimateNumber value={num} countBy={1} timing="linear" />%
      </BoldOpen>
    );
  };

  const calculateIndex = () => {
    if (!name || !partner) return;
    setLoading(true);
    Axios.get(
      `https://love-calculator.p.rapidapi.com/getPercentage?fname=${name}&sname=${partner}`,
      {
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key":
            "e4ef5c1f70msh3b87a1382284528p1c38ecjsn8a7ba5ca30b5",
        },
      }
    ).then((res) => {
      console.log(res.data);
      setLoading(false);
      setResult(res.data);
    });
  };

  const switchView = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator color={"white"} size={"large"} />
        </View>
      );
    } else if (result) {
      return (
        <View style={styles.centerContainer}>
          {animatedNumber(result.percentage)}
          <LightOpen style={{ color: "white", fontSize: 20 }}>
            {result.result}
          </LightOpen>
          <Spacer />
          <LoveButton onPress={() => setResult(null)} text={"Try again"} />
        </View>
      );
    } else {
      return (
        <View style={styles.contentContainer}>
          <Bold style={{ fontSize: 40, color: "white" }}>Love Index</Bold>
          <Spacer />
          <Spacer />
          <LoveTextInput
            placeholder={"your name"}
            value={name}
            onChangeText={(val) => setName(val)}
          />
          <Spacer />
          <FontAwesome5 name="plus" size={24} color="white" />
          <Spacer />
          <LoveTextInput
            placeholder={"partner's name"}
            value={partner}
            onChangeText={(val) => setPartner(val)}
          />
          <Spacer />
          <Spacer />
          <LoveButton onPress={() => calculateIndex()} text={"calculate"} />
        </View>
      );
    }
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#C5AFF6", "#5920D6"]}
      style={styles.container}
    >
      <View style={styles.container}>{switchView()}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    paddingTop: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartContainer: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "transparent",
  },
  heart: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
