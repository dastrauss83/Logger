import firebase from "firebase";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import MyButton from "../Atoms/MyButton";
import MyInput from "../Atoms/MyInput";

const ChangePassword = () => {
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const handleChangePassword = () => {
    Alert.alert(
      "Are You Sure?",
      "Are you sure you want to change your Password?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: async () => {
            firebase.auth().currentUser?.updatePassword(newPassword);
          },
        },
      ]
    );
  };

  return (
    <>
      <MyButton
        onPress={() => setPasswordModal(true)}
        containerColor={colors.second}
        textColor={colors.first}
        text={"Change Password"}
        icon={
          <Icon
            name="user"
            size={25}
            color={colors.first}
            style={{ position: "absolute", left: 20, top: 23 }}
          />
        }
      />
      <Modal animationType="slide" visible={passwordModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <MyInput
              placeholder={"New Password"}
              value={newPassword}
              onChangeText={setNewPassword}
              style={{ backgroundColor: colors.second, color: colors.first }}
              secureTextEntry={true}
            />
            <MyButton
              onPress={handleChangePassword}
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
              onPress={() => setPasswordModal(false)}
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

export default ChangePassword;

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
