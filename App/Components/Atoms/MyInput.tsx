import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../../config/colors";

type MyInputProps = {
  value: any;
  onChangeText: any;
  placeholder: string;
  autoCompleteType?: any;
  keyboardType?: any;
  autoCapitalize?: any;
  textContentType?: any;
  secureTextEntry?: any;
  textAlign?: any;
  style?: any;
  placeholderTextColor?: any;
};

const MyInput = ({
  value,
  onChangeText,
  placeholder,
  autoCompleteType,
  keyboardType,
  autoCapitalize,
  textContentType,
  secureTextEntry,
  textAlign,
  style,
  placeholderTextColor,
}: MyInputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCompleteType={autoCompleteType || "off"}
      keyboardType={keyboardType || "default"}
      secureTextEntry={secureTextEntry || false}
      autoCapitalize={autoCapitalize || "sentences"}
      textAlign={textAlign || "left"}
      textContentType={textContentType || "none"}
      placeholderTextColor={placeholderTextColor || "#C7C7CD"}
    />
  );
};

export default MyInput;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 70,
    backgroundColor: colors.first,
    color: colors.second,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
    fontSize: 30,
    padding: 10,
  },
});
