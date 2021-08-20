import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
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
    let interval: any;

    if (activeCounter) {
      interval = setInterval(() => {
        if (counter > 1800) {
          setCounter(0);
          setActiveCounter(false);
          return Alert.alert(
            "Don't Lie...",
            "Please enter a time under 30 minutes",
            [{ text: "Ok" }]
          );
        }
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
    setMinutes(userMinutes);
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

  const handleClear = () => {
    setCounter(0);
    setMinutes("");
    setSeconds("");
    activeCounter && setActiveCounter(false);
  };

  return (
    <>
      <View style={styles.timeEnterContainer}>
        <MyInput
          value={minutes}
          onChangeText={(userMinutes: string) => handleMinutes(userMinutes)}
          placeholder={"Mins."}
          keyboardType={"number-pad"}
          textAlign="center"
          style={[styles.input, { marginLeft: 60 }]}
        />

        <Text
          style={{
            fontSize: 40,
            color: colors.second,
          }}
        >
          :
        </Text>
        <MyInput
          value={seconds}
          onChangeText={(userSeconds: string) => handleSeconds(userSeconds)}
          placeholder={"Secs."}
          keyboardType={"number-pad"}
          textAlign="center"
          style={[styles.input, { marginRight: 60 }]}
        />
      </View>
      <View
        style={[
          styles.timeEnterContainer,
          { borderBottomColor: colors.second, borderBottomWidth: 2 },
        ]}
      >
        <MyButton
          onPress={handleClear}
          containerColor={
            minutes === "" && seconds === "" ? colors.third : "red"
          }
          textColor={colors.first}
          text={"Clear"}
          style={{ width: "30%" }}
          icon={
            <IconMaterial
              name="clear"
              size={25}
              color={colors.first}
              style={{ marginRight: 10 }}
            />
          }
        />
        <MyButton
          onPress={() => setActiveCounter(!activeCounter)}
          containerColor={activeCounter ? "red" : colors.second}
          textColor={colors.first}
          text={activeCounter ? "Stop Timer" : "Start Timer"}
          style={{ width: "60%" }}
          icon={
            <Icon
              name="ios-timer-outline"
              size={25}
              color={colors.first}
              style={{ marginRight: 10 }}
            />
          }
        />
      </View>
    </>
  );
};

export default Time;

const styles = StyleSheet.create({
  input: {
    width: "25%",
    backgroundColor: colors.second,
    color: colors.first,
  },
  timeEnterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
