import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

import styles from "./LoveButton.styles";

interface LoveButtonProps {
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: any;
  text: string;
}

const LoveButton: React.FC<LoveButtonProps> = ({
  buttonStyle,
  onPress,
  text,
}) => (
  <TouchableOpacity style={[buttonStyle]} onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default LoveButton;
