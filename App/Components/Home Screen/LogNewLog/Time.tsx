import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import colors from "../../../config/colors";
import MyInput from "../../Atoms/MyInput";

type TimeProps = {
  minutes: string;
  seconds: string;
  setMinutes: (minutes: string) => void;
  setSeconds: (minutes: string) => void;
};

const Time = ({ minutes, seconds, setMinutes, setSeconds }: TimeProps) => {
  const handleMinutes = (userMinutes: string) => {
    if (parseInt(userMinutes) > 30) {
      setMinutes("");
      return Alert.alert(
        "Don't Lie...",
        "Please enter a time under 30 minutes",
        [{ text: "Ok" }]
      );
    }
    setMinutes(userMinutes);
  };

  const handleSeconds = (userSeconds: string) => {
    if (parseInt(userSeconds) > 59) {
      setSeconds("");
      return Alert.alert("Error", "Please enter under 60 seconds", [
        { text: "Ok" },
      ]);
    }
    setSeconds(userSeconds);
  };

  return (
    <View style={styles.timeEnterContainer}>
      <MyInput
        value={minutes}
        onChangeText={(userMinutes: string) => handleMinutes(userMinutes)}
        placeholder={"Mins."}
        keyboardType={"number-pad"}
        textAlign="center"
        style={styles.input}
      />
      <MyInput
        value={seconds}
        onChangeText={(userSeconds: string) => handleSeconds(userSeconds)}
        placeholder={"Secs."}
        keyboardType={"number-pad"}
        textAlign="center"
        style={styles.input}
      />
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  input: {
    width: "30%",
    backgroundColor: colors.second,
    color: colors.first,
  },
  timeEnterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});
