import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Text style={{ ...style.text, color: "#fff" }}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#00B603",
    height: 55,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
  },
});

export default Button;
