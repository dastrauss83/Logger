import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../config/colors";

const PromptText = () => {
  return (
    <View style={styles.textContainer}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          color: colors.second,
        }}
      >
        Enter the Time, Location, and even a Picture of your new Log!
      </Text>
    </View>
  );
};

export default PromptText;

const styles = StyleSheet.create({
  textContainer: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    flexWrap: "wrap",
    marginTop: 30,
  },
});
