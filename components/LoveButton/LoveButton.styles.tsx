import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 25,
    height: 50,
    padding: 15,
  },
  text: {
    marginTop: 10,
    textAlign: "center",
    color: Colors.WHITE,
    fontSize: 20,
  },
});

export default styles;
