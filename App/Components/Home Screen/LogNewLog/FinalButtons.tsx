import firebase from "firebase";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../config/colors";
import { useUserContext } from "../../../UserContext";
import MyButton from "../../Atoms/MyButton";

type FinalButtonsProps = {
  minutes: string;
  seconds: string;
  setMinutes: (minutes: string) => void;
  setSeconds: (seconds: string) => void;
  setShowLog: (bool: boolean) => void;
};

const FinalButtons = ({
  seconds,
  minutes,
  setSeconds,
  setMinutes,
  setShowLog,
}: FinalButtonsProps) => {
  const { currentUser } = useUserContext();

  const handleSubmit = async () => {
    if (seconds === "" || minutes === "") {
      return Alert.alert("Error", "Please enter minutes and seconds", [
        { text: "Ok" },
      ]);
    }
    setShowLog(false);
    const userData: any = (
      await firebase.firestore().collection("users").doc(currentUser.uid).get()
    ).data();
    const tempLogs = [...userData.logs];
    tempLogs.push({
      minutes: minutes,
      seconds: seconds,
      time: firebase.firestore.Timestamp.now(),
    });
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({ logs: tempLogs });
    setMinutes("");
    setSeconds("");
    setShowLog(false);
  };
  return (
    <View style={styles.submitClose}>
      <MyButton
        onPress={() => {
          setShowLog(false);
          setMinutes("");
          setSeconds("");
        }}
        containerColor={colors.third}
        textColor={colors.first}
        text={"Close"}
        icon={
          <Icon
            name="closecircleo"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
        style={{ width: "45%", marginBottom: 0 }}
      />
      <MyButton
        onPress={handleSubmit}
        containerColor={colors.second}
        textColor={colors.first}
        text={"Submit"}
        icon={
          <Icon
            name="upload"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
        style={{ width: "45%", marginBottom: 0 }}
      />
    </View>
  );
};

export default FinalButtons;

const styles = StyleSheet.create({
  submitClose: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
});
