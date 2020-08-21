import React from "react";
import { TextInput } from "react-native";
import styles from "./LoveTextInput.styles";
import Colors from "../../constants/Colors";

interface LoveTextInputProps {
  placeholder: string;
  onChangeText: Function;
  value: string;
}

const LoveTextInput: React.FC<LoveTextInputProps> = ({
  onChangeText,
  value,
  placeholder,
}) => (
  <TextInput
    style={styles.textInput}
    placeholder={placeholder}
    placeholderTextColor={"#806D72"}
    onChangeText={(text) => onChangeText(text)}
    value={value}
  />
);

export default LoveTextInput;
