import firebase from "firebase";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { firebaseGroupCollection } from "../../../../../App";
import colors from "../../../../config/colors";
import { useUserContext } from "../../../../UserContext";
import MyButton from "../../../Atoms/MyButton";

type FinalButtonsProps = {
  groupName: string;
  setGroupName: (e: string) => void;
  setNewGroupModal: (e: boolean) => void;
};

const FinalButtons = ({
  groupName,
  setGroupName,
  setNewGroupModal,
}: FinalButtonsProps) => {
  const { currentUser } = useUserContext();

  const handleSubmit = async () => {
    await firebaseGroupCollection.doc().set({
      adminID: currentUser.uid,
      adminCustomUserName: currentUser.customUserName,
      name: groupName,
      usersID: [currentUser.uid],
      usersCustomUserName: [currentUser.customUserName],
      requestedsID: [],
    });
    setNewGroupModal(false);
    setGroupName("");
  };

  return (
    <View style={styles.submitClose}>
      <MyButton
        onPress={() => {
          setNewGroupModal(false);
          setGroupName("");
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
