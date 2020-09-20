import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Bold } from "../components/StyledText/StyledText.components";

import LoveTextInput from "../components/LoveTextInput/LoveTextInput.component";
import LoveButton from "../components/LoveButton/LoveButton.component";
import Colors from "../constants/Colors";

export default function Home({ navigation }) {
  const [name, setName] = useState(null);
  const [partner, setPartner] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bold style={{ fontSize: 70, color: Colors.DARK_PINK }}>
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
          placeholder={"partner's name"}
          onFocus={() => setPartner("")}
          value={partner}
          onChangeText={(val) => setPartner(val)}
        />
      </View>
      <View style={styles.footer}>
        <LoveButton
          onPress={() =>
            name?.length &&
            partner?.length &&
            navigation.navigate("Results", { name, partner })
          }
          text={"calculate"}
        />
      </View>
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
    flex: 0.6,
    justifyContent: "center",
  },
  inputs: {
    flex: 0.7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
  },
});
