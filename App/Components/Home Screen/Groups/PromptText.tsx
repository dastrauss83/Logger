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
          Create a Group with a unique name. You will be asked to approve all
          future users.
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
