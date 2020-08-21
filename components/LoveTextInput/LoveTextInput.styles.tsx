import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { isSmallDevice } from "../../constants/Layout";
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    color: "black",
    borderStyle: "solid",
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    fontFamily: "OpenSans_300Light",
    width: 220,
    fontSize: 18,
    height: 40,
    textAlign: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});

export default styles;
