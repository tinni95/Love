import HeartFloating from "../HeartFloating";
import React from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  Bold,
  BoldOpen,
  LightOpen,
} from "../components/StyledText/StyledText.components";
import LoveButton from "../components/LoveButton/LoveButton.component";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Axios from "axios";
import AnimateNumber from "react-native-countup";
import { API_KEY } from "react-native-dotenv";

export default Results = ({ navigation, route }) => {
  const { name, partner } = route.params;

  React.useLayoutEffect(() => {
    calculateIndex(name, partner);
  }, []);

  const [loading, setLoading] = React.useState(true);
  const [animate, setTextAnimationEnd] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
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
      //yes
      return 25;
    } else {
      50;
    }
  };

  const animatedNumber = (num) => {
    return (
      <BoldOpen
        style={{ fontSize: 80, marginBottom: -40, color: Colors.DARK_PINK }}
      >
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

  const calculateIndex = (name, partner) => {
    setLoading(true);
    Axios.get(
      `https://love-calculator.p.rapidapi.com/getPercentage?fname=${name}&sname=${partner}`,
      {
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    ).then((res) => {
      setResult(res.data);
      setLoading(false);
    });
  };

  if (loading || !result) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeartFloating
        onComplete={() => setTextAnimationEnd(false)}
        animate={animate}
        limit={getLimit(result.percentage)}
      >
        <Animated.View style={[styles.heading, { opacity: fadeAnim }]}>
          <Bold style={styles.couple}>
            {name} and {partner}
          </Bold>
          <BoldOpen
            style={{ color: Colors.MEDIUM_PINK, fontSize: 28, marginTop: 10 }}
          >
            Love Index
          </BoldOpen>
        </Animated.View>
        <View style={styles.numberContainer}>
          {animatedNumber(result.percentage)}
          <Animated.View style={{ opacity: fadeAnim }}>
            <LightOpen style={styles.resultText}>{result.result}</LightOpen>
          </Animated.View>
        </View>
        <Animated.View style={{ flex: 1, opacity: fadeAnim, ...styles.footer }}>
          <LoveButton
            onPress={() => {
              setResult(null);
              navigation.navigate("Home");
            }}
            text={"Try again"}
          />
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 40 }}
            onPress={() => {}}
          >
            <EvilIcons name="share-apple" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </HeartFloating>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  footer: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  numberContainer: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    color: Colors.MEDIUM_PINK,
    fontSize: 30,
    textAlign: "center",
  },
  couple: { fontSize: 38, color: Colors.MEDIUM_PINK },
});
