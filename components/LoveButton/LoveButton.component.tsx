import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import styles from "./LoveButton.styles";

interface LoveButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  text: string;
  textStyle?: StyleProp<TextStyle>;
}

const LoveButton: React.FC<LoveButtonProps> = ({
  buttonStyle,
  onPress,
  text,
  textStyle,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.container, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default LoveButton;
