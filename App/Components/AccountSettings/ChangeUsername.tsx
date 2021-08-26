import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { firebaseUserCollection, storeCurrentUser } from "../../../App";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import MyButton from "../Atoms/MyButton";
import MyInput from "../Atoms/MyInput";

const ChangeUsername = ({ setCurrentUser }: any) => {
  const [usernameModal, setUsernameModal] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const { currentUser } = useUserContext();

  const handleChangeUsername = () => {
    Alert.alert(
      "Are You Sure?",
      "Are you sure you want to change your User Name?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await firebaseUserCollection.doc(currentUser.uid).update({
              customUserName: newUsername,
            });
            storeCurrentUser({
              uid: currentUser.uid,
              customUserName: newUsername,
            });
            setUsernameModal(false);
            setNewUsername("");
            setCurrentUser({
              uid: currentUser.uid,
              customUserName: newUsername,
            });
          },
        },
      ]
    );
  };

  return (
    <>
      <MyButton
        onPress={() => setUsernameModal(true)}
        containerColor={colors.second}
        textColor={colors.first}
        text={"Change User Name"}
        icon={
          <Icon
            name="user"
            size={25}
            color={colors.first}
            style={{ position: "absolute", left: 20, top: 23 }}
          />
        }
      />
      <Modal animationType="slide" visible={usernameModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <MyInput
              placeholder={"New User Name"}
              value={newUsername}
              onChangeText={setNewUsername}
              style={{
                backgroundColor: colors.second,
                color: colors.first,
                width: "88%",
              }}
            />
            <MyButton
              onPress={handleChangeUsername}
              containerColor={colors.second}
              textColor={colors.first}
              text={"Change"}
              style={{ width: "88%" }}
              icon={
                <Icon
                  name="user"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
            />
            <MyButton
              onPress={() => setUsernameModal(false)}
              containerColor={colors.third}
              textColor={colors.first}
              text={"Close Menu"}
              style={{ width: "88%" }}
              icon={
                <Icon
                  name="back"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "91%",
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
});
