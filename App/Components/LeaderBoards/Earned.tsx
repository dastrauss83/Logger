import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import colors from "../../config/colors";

const Earned = () => {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.topText}>All Time Leaders by $ Earned</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Earned;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
  },
  topText: {
    textAlign: "center",
    fontSize: 30,
    color: colors.second,
  },
});
