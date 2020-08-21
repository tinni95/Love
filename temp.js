import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, View, Dimensions, Easing } from "react-native";
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
import { Bold, LightOpen } from "./components/StyledText/StyledText.components";
import LoveTextInput from "./components/LoveTextInput/LoveTextInput.component";
import Colors from "./constants/Colors";
import Spacer from "./components/Spacer/Spacer";
import LoveButton from "./components/LoveButton/LoveButton.component";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import shortid from "shortid";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const animationEndY = Math.ceil(height);
const negativeEndY = animationEndY * -1;

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  let number = Math.round(getRandomNumber(0, 1));
  if (number == 1) {
    return "#FF18E1";
  } else {
    return "#FFDDFB";
  }
}

export default function App() {
  const [hearts, setHearts] = useState([]);
  const [yourName, setYourName] = React.useState("");
  const [partnerName, setPartnerName] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [falling, setFalling] = React.useState(true);
  const oldHearts = React.useRef(hearts);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  React.useEffect(() => {
    let id;
    console.log(hearts.length);
    console.log(falling);
    if (hearts.length > 20) {
      setFalling(false);
    } else if (falling) {
      id = setTimeout(
        setHearts([
          ...hearts,
          {
            id: shortid.generate(),
            right: getRandomNumber(-(width - 75), width - 75),
          },
        ]),
        20
      );
    }

    return () => {
      clearInterval(id);
    };
  }, [hearts, falling]);

  const addHeart = () => {
    setHearts([
      ...hearts,
      {
        id: shortid.generate(),
        right: getRandomNumber(-(width - 75), width - 75),
      },
    ]);
  };

  const removeHeart = (index) => {
    setHearts(
      hearts.filter((heart, i) => {
        return index != i;
      })
    );
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

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#C5AFF6", "#5920D6"]}
      style={styles.container}
    >
      <View style={styles.container}>
        <LoveButton
          onPress={() => {
            addHeart();
          }}
          text={"press me"}
        />
        {hearts.map((heart, index) => (
          <HeartContainer
            key={heart.id}
            style={{ right: heart.right }}
            onComplete={() => removeHeart(index)}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

const HeartContainer = (props) => {
  const [position, setPosition] = useState(new Animated.Value(0));
  const yAnimation = useRef(null);

  useEffect(() => {
    yAnimation.current = position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0],
    });
    Animated.timing(position, {
      duration: 3000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => props.onComplete());
  }, []);

  const getHeartStyle = () => {
    return {
      transform: [{ translateY: position }],
    };
  };
  return (
    <Animated.View
      style={[styles.heartContainer, props.style, getHeartStyle()]}
    >
      <Heart color={() => getRandomColor()} />
    </Animated.View>
  );
};

const Heart = (props) => (
  <View {...props} style={[styles.heart, props.style]}>
    <AntDesign name="heart" size={25} color={props.color} />
  </View>
);

export let [fontsLoaded] = useFonts({
  LobsterTwo_400Regular,
  LobsterTwo_400Regular_Italic,
  LobsterTwo_700Bold,
  LobsterTwo_700Bold_Italic,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_700Bold,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
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
