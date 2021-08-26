import firebase from "firebase";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import MyButton from "../Atoms/MyButton";
import MyInput from "../Atoms/MyInput";

const ChangeEmail = () => {
  const [emailModal, setEmailModal] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");

  const handleChangeEmail = () => {
    Alert.alert(
      "Are You Sure?",
      "Are you sure you want to change your Email?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: async () => {
            firebase.auth().currentUser?.updateEmail(newEmail);
          },
        },
      ]
    );
  };

  return (
    <>
      <MyButton
        onPress={() => setEmailModal(true)}
        containerColor={colors.second}
        textColor={colors.first}
        text={"Change Email"}
        icon={
          <Icon
            name="user"
            size={25}
            color={colors.first}
            style={{ position: "absolute", left: 20, top: 23 }}
          />
        }
      />
      <Modal animationType="slide" visible={emailModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <MyInput
              placeholder={"New Email"}
              value={newEmail}
              onChangeText={setNewEmail}
              style={{ backgroundColor: colors.second, color: colors.first }}
            />
            <MyButton
              onPress={handleChangeEmail}
              containerColor={colors.second}
              textColor={colors.first}
              text={"Change"}
              icon={
                <Icon
                  name="user"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
            />
            <MyButton
              onPress={() => setEmailModal(false)}
              containerColor={colors.third}
              textColor={colors.first}
              text={"Close Menu"}
              style={{ marginBottom: 0 }}
              icon={
                <Icon
                  name="back"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "80%",
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
