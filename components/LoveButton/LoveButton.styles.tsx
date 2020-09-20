import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.MEDIUM_PINK,
    borderRadius: 20,
    height: 50,
    width: 200,
  },
  text: {
    textAlign: "center",
    color: Colors.WHITE,
    fontWeight: "400",
    fontSize: 20,
  },
});

export default styles;
