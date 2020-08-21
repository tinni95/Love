import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#C5ADF8",
    borderRadius: 5,
    height: 35,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  text: {
    textAlign: "center",
    color: Colors.WHITE,
    fontWeight: "400",
    fontSize: 20,
  },
});

export default styles;
