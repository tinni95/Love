import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { BoldOpen, LightOpen } from "../StyledText/StyledText.components";

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
      <BoldOpen style={[styles.text, textStyle]}>{text}</BoldOpen>
    </View>
  </TouchableOpacity>
);

export default LoveButton;
