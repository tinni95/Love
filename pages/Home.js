import React, { useState } from "react";
import { StyleSheet, View, Keyboard, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Bold } from "../components/StyledText/StyledText.components";

import LoveTextInput from "../components/LoveTextInput/LoveTextInput.component";
import LoveButton from "../components/LoveButton/LoveButton.component";
import Colors from "../constants/Colors";

export default function Home({ navigation }) {
  const [name, setName] = useState(null);
  const [partner, setPartner] = useState(null);
  const [KeyboardShown, setKeyboardShown] = useState(false);
  const growAnim = React.useRef(new Animated.Value(0.5)).current;

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShown(true);
    growIn();
  };

  const _keyboardDidHide = () => {
    setKeyboardShown(false);
    growOut();
  };

  const growIn = () => {
    Animated.timing(growAnim, {
      toValue: 0.3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const growOut = () => {
    Animated.timing(growAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bold style={{ fontSize: 70, color: Colors.MEDIUM_PINK }}>
          Love Index
        </Bold>
      </View>
      <View style={styles.inputs}>
        <LoveTextInput
          placeholder={"your name"}
          onFocus={() => setName("")}
          value={name}
          onChangeText={(val) => setName(val)}
        />
        <FontAwesome5 name="plus" size={24} color={Colors.DARK_PINK} />
        <LoveTextInput
          placeholder={"partner"}
          onFocus={() => setPartner("")}
          value={partner}
          onChangeText={(val) => setPartner(val)}
        />
      </View>

      <Animated.View
        style={([styles.footer], { flex: growAnim, justifyContent: "center" })}
      >
        {!KeyboardShown && (
          <LoveButton
            onPress={() =>
              name?.length &&
              partner?.length &&
              navigation.navigate("Results", { name, partner })
            }
            text={"index"}
          />
        )}
      </Animated.View>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  inputs: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flex: 0.5,
    justifyContent: "center",
  },
});
