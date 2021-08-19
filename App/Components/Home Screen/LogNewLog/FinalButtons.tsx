import firebase from "firebase";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { firebaseUserCollection } from "../../../../App";
import colors from "../../../config/colors";
import { useUserContext } from "../../../UserContext";
import MyButton from "../../Atoms/MyButton";

type FinalButtonsProps = {
  minutes: string;
  seconds: string;
  rate: string;
  setMinutes: (minutes: string) => void;
  setSeconds: (seconds: string) => void;
  setShowLog: (bool: boolean) => void;
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const FinalButtons = ({
  seconds,
  minutes,
  setSeconds,
  setMinutes,
  rate,
  setShowLog,
  setRefresh,
  refresh,
}: FinalButtonsProps) => {
  const { currentUser } = useUserContext();

  const handleSubmit = async () => {
    if (seconds === "" && minutes === "") {
      return Alert.alert("Error", "Please enter minutes and seconds", [
        { text: "Ok" },
      ]);
    }
    setShowLog(false);
    const userData: any = (
      await firebaseUserCollection.doc(currentUser.uid).get()
    ).data();
    const earned = (
      ((parseInt(minutes === "" ? "0" : minutes) * 60 +
        parseInt(seconds === "" ? "0" : seconds)) *
        parseInt(userData.rate || rate)) /
      60 /
      60
    )
      .toFixed(2)
      .toString();
    const tempLogs = [...userData.logs];
    tempLogs.push({
      minutes: minutes === "" ? "0" : minutes,
      seconds: seconds === "" ? "0" : seconds,
      time: firebase.firestore.Timestamp.now(),
      earned: earned,
    });
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({ logs: tempLogs });
    setMinutes("");
    setSeconds("");
    setShowLog(false);
    setRefresh && setRefresh(!refresh);
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
            name="back"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
        style={{ width: "30%", marginBottom: 0 }}
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
        style={{ width: "60%", marginBottom: 0 }}
      />
    </View>
  );
};

export default FinalButtons;

const styles = StyleSheet.create({
  submitClose: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 30,
  },
});
