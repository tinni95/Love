import React from "react";
import { Text } from "react-native";
import Colors from "../../constants/Colors";

export function Body(props?: any) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { color: Colors.WHITE, fontFamily: "LobsterTwo_400Regular" },
      ]}
    />
  );
}

export function Bold(props?: any) {
  return (
    <Text
      {...props}
      style={[
        { color: Colors.WHITE, fontFamily: "LobsterTwo_700Bold" },
        props.style,
      ]}
    />
  );
}

export function LightOpen(props?: any) {
  return (
    <Text
      {...props}
      style={[
        { color: Colors.WHITE, fontFamily: "OpenSans_300Light" },
        props.style,
      ]}
    />
  );
}

export function BoldOpen(props?: any) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { color: Colors.WHITE, fontFamily: "OpenSans_700Bold" },
        props.style,
      ]}
    />
  );
}
