import firebase from "firebase";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import MyButton from "../Atoms/MyButton";

const LogNewLog = () => {
  const [showLog, setShowLog] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const { currentUser } = useUserContext();

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
    <>
      <MyButton
        onPress={() => setShowLog(true)}
        containerColor={colors.third}
        textColor={colors.first}
        text={"Log New Log"}
        icon={
          <Icon
            name="pluscircleo"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
      <Modal animationType="slide" visible={showLog} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
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
              <View style={styles.timeEnterView}>
                <TextInput
                  style={styles.input}
                  value={minutes}
                  onChangeText={(userMinutes) => handleMinutes(userMinutes)}
                  placeholder={"Mins."}
                  keyboardType={"number-pad"}
                  textAlign="center"
                />
                <TextInput
                  style={styles.input}
                  value={seconds}
                  onChangeText={(userSeconds) => handleSeconds(userSeconds)}
                  placeholder={"Secs."}
                  keyboardType={"number-pad"}
                  textAlign="center"
                />
              </View>
              <View style={styles.submitClose}>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.closeModal]}
                  onPress={() => setShowLog(false)}
                >
                  <Icon name="closecircleo" size={25} color={colors.first} />
                  <Text style={{ fontSize: 25, color: colors.first }}>
                    Close Menu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.submit]}
                  onPress={handleSubmit}
                >
                  <Icon name="upload" size={25} color={colors.first} />
                  <Text style={{ fontSize: 25, color: colors.first }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LogNewLog;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 25,
    color: colors.first,
  },
  textContainer: {
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    flexWrap: "wrap",
    marginTop: 30,
  },
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.third,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "45%",
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  },
  modalView: {
    width: "100%",
    height: "75%",
    backgroundColor: colors.first,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModal: {
    backgroundColor: colors.third,
    marginBottom: 0,
  },
  submit: {
    backgroundColor: colors.second,
    marginBottom: 0,
  },
  submitClose: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  timeEnterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    width: "30%",
    height: 70,
    backgroundColor: colors.second,
    color: colors.first,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
    fontSize: 30,
    padding: 10,
  },
});
