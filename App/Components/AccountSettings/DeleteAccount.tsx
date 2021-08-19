import firebase from "firebase";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { firebaseUserCollection, storeCurrentUser } from "../../../App";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import MyButton from "../Atoms/MyButton";

const DeleteAccount = () => {
  const { currentUser, setCurrentUser } = useUserContext();

  const handleDelete = () => {
    Alert.alert("Are You Sure?", "Are you sure you want to delete this Log?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await firebaseUserCollection.doc(currentUser.uid).delete();
          await firebase
            .auth()
            .currentUser?.delete()
            .catch(() =>
              Alert.alert("Error", "Unable to Delete User", [{ text: "Ok" }])
            );
          setCurrentUser({ customUserName: "noUser", uid: "" });
          storeCurrentUser("noUser");
        },
      },
    ]);
  };

  return (
    <MyButton
      onPress={handleDelete}
      containerColor={"red"}
      textColor={colors.first}
      text={"Delete Account"}
      icon={
        <Icon
          name="deleteuser"
          size={25}
          color={colors.first}
          style={{ marginRight: 10 }}
        />
      }
    />
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
