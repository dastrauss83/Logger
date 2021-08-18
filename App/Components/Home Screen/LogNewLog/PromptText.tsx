import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../config/colors";

const PromptText = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.textContainer}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: colors.second,
            width: "80%",
          }}
        >
          Enter the Time, Value, Location, and even a Picture of your new Log!
        </Text>
      </View>
    </View>
  );
};

export default PromptText;

const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  wrapper: {
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
  },
});
