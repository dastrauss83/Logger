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
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const FinalButtons = ({
  groupName,
  setGroupName,
  setNewGroupModal,
  refresh,
  setRefresh,
}: FinalButtonsProps) => {
  const { currentUser } = useUserContext();

  const handleSubmit = async () => {
    await firebaseGroupCollection
      .add({
        admin: {
          uid: currentUser.uid,
          customUserName: currentUser.customUserName,
        },
        name: groupName,
        users: [
          {
            uid: currentUser.uid,
            customUserName: currentUser.customUserName,
          },
        ],
        requesters: [],
      })
      .then(async (docRef) => {
        await firebaseGroupCollection.doc(docRef.id).update({
          id: docRef.id,
        });
      });
    setNewGroupModal(false);
    setGroupName("");
    setRefresh && setRefresh(!refresh);
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
            style={{ width: "30%", marginBottom: 0 }}
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
            style={{ position: "absolute", left: 10, top: 23 }}
          />
        }
        style={{ width: "60%", marginBottom: 0, paddingLeft: 5 }}
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
