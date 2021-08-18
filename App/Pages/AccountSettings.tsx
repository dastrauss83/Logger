import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../Components/Atoms/MyButton";
import colors from "../config/colors";
import { useUserContext } from "../UserContext";
import Icon from "react-native-vector-icons/AntDesign";
import { firebaseUserCollection } from "../../App";
import firebase from "firebase";

const AccountSettings = () => {
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
          setCurrentUser({
            customUserName: "noUser",
            uid: "",
          });
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.buttonsContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    paddingTop: 75,
    width: "100%",
  },
});
