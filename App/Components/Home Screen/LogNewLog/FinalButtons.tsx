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
  picture: any;
  coordinate: any;
  setCoordinate: (e: any) => void;
  location: boolean;
  setLocation: (e: boolean) => void;
  setMinutes: (minutes: string) => void;
  setSeconds: (seconds: string) => void;
  setShowLog: (bool: boolean) => void;
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const FinalButtons = ({
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  rate,
  picture,
  coordinate,
  setCoordinate,
  location,
  setLocation,
  setShowLog,
  setRefresh,
  refresh,
}: FinalButtonsProps) => {
  const { currentUser } = useUserContext();

  const getPictureBlob = (uri: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const awaitAlert = async () => {
    if (rate === "") {
      return new Promise((resolve, reject) =>
        Alert.alert(
          "Notice",
          "If you do not enter a rate it will be set at 0. In Account Settings you can save a rate.",
          [
            {
              text: "Set a rate",
              onPress: () => {
                resolve("set");
              },
            },
            { text: "Use $0/hr", onPress: () => resolve("0") },
          ]
        )
      );
    }
  };

  const handleSubmit = async () => {
    if (seconds === "" && minutes === "") {
      return Alert.alert("Error", "Please enter minutes and seconds", [
        { text: "Ok" },
      ]);
    }

    const rateResponse = await awaitAlert();
    if (rateResponse === "set") return;

    const userData: any = (
      await firebaseUserCollection.doc(currentUser.uid).get()
    ).data();

    const earned = (
      ((parseInt(minutes === "" ? "0" : minutes) * 60 +
        parseInt(seconds === "" ? "0" : seconds)) *
        parseInt(rate || "0")) /
      60 /
      60
    )
      .toFixed(2)
      .toString();

    let blob: any;
    let photoURL: string;
    if (picture !== "") {
      blob = await getPictureBlob(picture);
      const filename = picture.substring(picture.lastIndexOf("/") + 1);
      await firebase.storage().ref(filename).put(blob);
      photoURL = await firebase
        .storage()
        .ref()
        .child(filename)
        .getDownloadURL();
    } else {
      photoURL = "";
    }

    const tempLogs = [...userData.logs];
    tempLogs.unshift({
      minutes: minutes === "" ? "0" : minutes,
      seconds: seconds === "" ? "0" : seconds,
      time: firebase.firestore.Timestamp.now(),
      earned: earned,
      picture: photoURL,
      location: location ? coordinate : "",
    });

    firebaseUserCollection.doc(currentUser.uid).update({ logs: tempLogs });

    setCoordinate({
      latitude: 40.78555,
      longitude: -73.962,
    });
    setLocation(false);
    setMinutes("");
    setSeconds("");
    setShowLog(false);
    setRefresh && setRefresh(!refresh);
  };

  const handleClose = () => {
    setLocation(false);
    setShowLog(false);
    setMinutes("");
    setSeconds("");
    setCoordinate({
      latitude: 40.78555,
      longitude: -73.962,
    });
  };

  return (
    <View style={styles.submitClose}>
      <MyButton
        onPress={handleClose}
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
