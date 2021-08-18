import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../../config/colors";
import MyButton from "../../Atoms/MyButton";
import MyInput from "../../Atoms/MyInput";

type TimeProps = {
  minutes: string;
  seconds: string;
  setMinutes: (minutes: string) => void;
  setSeconds: (seconds: string) => void;
};

const Time = ({ minutes, seconds, setMinutes, setSeconds }: TimeProps) => {
  const [activeCounter, setActiveCounter] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log(counter);
    let interval: any;

    if (activeCounter) {
      interval = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        setSeconds(secondCounter.toString());
        setMinutes(minuteCounter.toString());
        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeCounter, counter]);

  useEffect(() => {
    if (minutes === "" && seconds === "") return setCounter(0);
    if (minutes === "") return setCounter(parseInt(seconds));
    if (seconds === "") return setCounter(parseInt(minutes) * 60);
    setCounter(parseInt(minutes) * 60 + parseInt(seconds));
  }, [minutes, seconds]);

  const handleMinutes = (userMinutes: string) => {
    if (parseInt(userMinutes) > 30) {
      setMinutes("");
      return Alert.alert(
        "Don't Lie...",
        "Please enter a time under 30 minutes",
        [{ text: "Ok" }]
      );
    }
    if (userMinutes.length > 2) {
      setMinutes(userMinutes.substr(1));
    } else setMinutes(userMinutes);
  };

  const handleSeconds = (userSeconds: string) => {
    if (parseInt(userSeconds) > 60) {
      setSeconds("");
      return Alert.alert("Error", "Please enter under 60 seconds", [
        { text: "Ok" },
      ]);
    }
    if (parseInt(userSeconds) === 60) {
      if (minutes === "") {
        setMinutes("1");
        setSeconds("");
      } else {
        setMinutes((parseInt(minutes) + 1).toString());
        setSeconds("");
      }
    } else {
      setSeconds(userSeconds);
    }
  };

  return (
    <>
      <MyButton
        onPress={() => setActiveCounter(!activeCounter)}
        containerColor={activeCounter ? "red" : colors.second}
        textColor={colors.first}
        text={activeCounter ? "Stop Timer" : "Start Timer"}
        icon={
          <Icon
            name="ios-timer-outline"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
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
    </>
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
