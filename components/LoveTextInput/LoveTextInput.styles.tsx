import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  textInput: {
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.WHITE,
    borderStyle: "solid",
    borderColor: Colors.LIGHT_PINK,
    backgroundColor: Colors.LIGHT_PINK,
    fontFamily: "BalooTammudu2_700Bold",
    width: 220,
    fontSize: 18,
    height: 50,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default styles;
