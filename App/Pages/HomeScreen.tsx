import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import LogNewLog from "../Components/Home Screen/LogNewLog";
import colors from "../config/colors";
import { useUserContext } from "../UserContext";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.buttonsContainer}>
        <LogNewLog />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.second,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    paddingTop: 100,
    width: "80%",
  },
  buttonText: {
    fontSize: 25,
    color: colors.first,
  },
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.third,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
});
