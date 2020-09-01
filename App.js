import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Easing,
} from "react-native";
import {
  useFonts,
  LobsterTwo_400Regular,
  LobsterTwo_400Regular_Italic,
  LobsterTwo_700Bold,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
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
import AnimateNumber from "react-native-countup";
import LoveTextInput from "./components/LoveTextInput/LoveTextInput.component";
import Spacer from "./components/Spacer/Spacer";
import LoveButton from "./components/LoveButton/LoveButton.component";
import Axios from "axios";
import HeartFloating from "./HeartFloating";
import { captureScreen } from "react-native-view-shot";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function App() {
  const [name, setName] = useState(null);
  const [partner, setPartner] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animate, setTextAnimationEnd] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

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
      <BoldOpen style={{ fontSize: 80, textAlign: "center", color: "white" }}>
        <AnimateNumber
          onFinish={() => {
            setTextAnimationEnd(true);
            fadeIn();
          }}
          countBy={1}
          value={num}
          timing="easeIn"
        />
        %
      </BoldOpen>
    );
  };

  const getLimit = (perc) => {
    console.log(perc);
    if (perc == 0) {
      return 1;
    } else if (perc < 15) {
      return 5;
    } else if (perc < 33) return 10;
    else if (perc < 66) {
      return 15;
    } else if (perc < 88) {
      return 25;
    } else {
      50;
    }
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
        <HeartFloating
          onComplete={() => setTextAnimationEnd(false)}
          animate={animate}
          limit={getLimit(result.percentage)}
        >
          <View style={styles.centerContainer}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
              <Bold style={{ fontSize: 38 }}>
                {name} and {partner}
              </Bold>
              <BoldOpen>Love Index</BoldOpen>
            </Animated.View>
            {animatedNumber(result.percentage)}
            <Spacer />
            <Spacer />
            <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
              <LightOpen
                style={{ color: "white", fontSize: 40, textAlign: "center" }}
              >
                {result.result}
              </LightOpen>
              <Spacer />

              <LoveButton
                textStyle={{ fontSize: 30 }}
                buttonStyle={{ height: 50 }}
                onPress={() => {
                  setResult(null);
                  fadeAnim.setValue(0);
                }}
                text={"Try again"}
              />
            </Animated.View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => {}}>
                <EvilIcons name="share-apple" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </HeartFloating>
      );
    } else {
      return (
        <View style={styles.contentContainer}>
          <Bold style={{ fontSize: 70, color: "white" }}>Love Index</Bold>
          <Spacer />
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
    paddingTop: "20%",
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
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  footer: {
    backgroundColor: "red",
    flex: 0.5,
    justifyContent: "flex-end",
  },
});
