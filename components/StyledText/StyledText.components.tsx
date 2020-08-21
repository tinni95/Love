import React from "react";
import { Text } from "react-native";

export function Body(props?: any) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "LobsterTwo_400Regular" }]}
    />
  );
}

export function Bold(props?: any) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "LobsterTwo_700Bold" }]}
    />
  );
}

export function LightOpen(props?: any) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "OpenSans_300Light" }]}
    />
  );
}

export function BoldOpen(props?: any) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "OpenSans_700Bold" }]}
    />
  );
}
