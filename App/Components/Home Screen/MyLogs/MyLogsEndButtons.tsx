import firebase from "firebase";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { firebaseUserCollection } from "../../../../App";
import colors from "../../../config/colors";
import { useUserContext } from "../../../UserContext";
import MyButton from "../../Atoms/MyButton";

type MyLogEndsButtonsProps = {
  index: number;
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const MyLogsEndButtons = ({
  index,
  refresh,
  setRefresh,
}: MyLogEndsButtonsProps) => {
  const { currentUser } = useUserContext();

  const handleDelete = () => {
    Alert.alert("Are You Sure?", "Are you sure you want to delete this Log?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: async () => {
          const response: any = (
            await firebaseUserCollection.doc(currentUser.uid).get()
          ).data();
          const tempUserLogs = response.logs;
          tempUserLogs.splice(index, 1);
          await firebaseUserCollection.doc(currentUser.uid).update({
            logs: tempUserLogs,
          });
          setRefresh && setRefresh(!refresh);
        },
      },
    ]);
  };
  return (
    <View style={styles.buttonContainer}>
      <MyButton
        onPress={handleDelete}
        containerColor={"red"}
        textColor={colors.first}
        text={"Delete"}
        icon={
          <Icon
            name="back"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
        style={styles.button}
      />
      <MyButton
        onPress={handleDelete}
        containerColor={colors.third}
        textColor={colors.first}
        text={"Expand"}
        icon={
          <Icon
            name="upload"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
        style={styles.button}
      />
    </View>
  );
};

export default MyLogsEndButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
    marginTop: 5,
  },
  button: { width: "45%", marginBottom: 0, height: 50 },
});
