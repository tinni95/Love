import React from "react";
import { TextInput } from "react-native";
import styles from "./LoveTextInput.styles";
import Colors from "../../constants/Colors";

interface LoveTextInputProps {
  placeholder: string;
  onChangeText: Function;
  value: string;
  onFocus: any;
}

const LoveTextInput: React.FC<LoveTextInputProps> = ({
  onChangeText,
  value,
  placeholder,
  onFocus,
}) => (
  <TextInput
    textAlign="center"
    onFocus={onFocus}
    style={{
      ...styles.textInput,
      paddingTop: !value || value.length == 0 ? 10 : 0,
    }}
    placeholder={placeholder}
    placeholderTextColor={"white"}
    onChangeText={(text) => onChangeText(text)}
    value={value}
  />
);

export default LoveTextInput;
