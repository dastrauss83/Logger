import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";

type MyButtonProps = {
  onPress: any;
  containerColor: string;
  textColor: string;
  text: string;
  icon?: any;
  style?: any;
};

const MyButton = ({
  onPress,
  containerColor,
  textColor,
  text,
  icon,
  style,
}: MyButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: containerColor }, style]}
    >
      {icon}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 70,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
  text: {
    fontSize: 25,
  },
});
