import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import IconAnt from "react-native-vector-icons/AntDesign";
import colors from "../../../../config/colors";
import MyButton from "../../../Atoms/MyButton";
import { firebaseGroupCollection } from "../../../../../App";
import { group } from "../../../../Pages/AllGroups";

type RequesterCardProps = {
  requesterID: string;
  requestersID: string[];
  requestersCustomUserName: string[];
  group: group;
  refresh: boolean;
  setRefresh: (e: boolean) => void;
  refresh2: boolean;
  setRefresh2: (e: boolean) => void;
};

const RequesterCard = ({
  requesterID,
  requestersID,
  requestersCustomUserName,
  group,
  refresh,
  setRefresh,
  refresh2,
  setRefresh2,
}: RequesterCardProps) => {
  const requesterCustomUserName =
    requestersCustomUserName[requestersID.indexOf(requesterID)];

  const removeUserFromRequested = async () => {
    const userIndex = group.requestersCustomUserName.indexOf(
      requesterCustomUserName
    );
    const tempRequestersID = [...group.requestersID];
    tempRequestersID.splice(userIndex, 1);
    const tempRequestersCustomUserName = [...group.requestersCustomUserName];
    tempRequestersCustomUserName.splice(userIndex, 1);
    await firebaseGroupCollection.doc(group.id).update({
      requestersID: tempRequestersID,
      requestersCustomUserName: tempRequestersCustomUserName,
    });
  };

  const handleReject = () => {
    Alert.alert(
      "Are You Sure?",
      `Are you sure you want to reject ${requesterCustomUserName}?`,
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await removeUserFromRequested();
            setRefresh(!refresh);
            setRefresh2(!refresh2);
          },
        },
      ]
    );
  };

  const handleAccept = async () => {
    const tempUsersID = [...group.usersID];
    tempUsersID.push(requesterID);
    const tempUsersCustomUserName = [...group.usersCustomUserName];
    tempUsersCustomUserName.push(requesterCustomUserName);
    await firebaseGroupCollection.doc(group.id).update({
      usersID: tempUsersID,
      usersCustomUserName: tempUsersCustomUserName,
    });
    await removeUserFromRequested();
    setRefresh(!refresh);
    setRefresh2(!refresh2);
  };

  return (
    <View style={styles.requesterCard}>
      <Text style={[styles.bottomText, { marginBottom: 0, fontSize: 25 }]}>
        {requesterCustomUserName}
      </Text>
      <View style={styles.buttonContainer}>
        <MyButton
          containerColor={"red"}
          textColor={colors.first}
          text={""}
          onPress={handleReject}
          style={styles.button}
          icon={<Icon name="x" size={25} color={colors.first} />}
        />
        <MyButton
          containerColor={"green"}
          textColor={colors.first}
          text={""}
          onPress={handleAccept}
          style={styles.button}
          icon={<IconAnt name="pluscircle" size={25} color={colors.first} />}
        />
      </View>
    </View>
  );
};

export default RequesterCard;

const styles = StyleSheet.create({
  requesterCard: {
    flexDirection: "row",
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.second,
    marginBottom: 15,
  },
  button: {
    width: "45%",
    height: 50,
    marginBottom: 0,
    marginTop: 0,
  },
});
