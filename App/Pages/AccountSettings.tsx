import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import colors from "../config/colors";
import ChangeUsername from "../Components/AccountSettings/ChangeUsername";
import ChangePassword from "../Components/AccountSettings/ChangePassword";
import ChangeEmail from "../Components/AccountSettings/ChangeEmail";
import ChangeRate from "../Components/AccountSettings/ChangeRate";
import DeleteAccount from "../Components/AccountSettings/DeleteAccount";
import Back from "../Components/Atoms/Back";

const AccountSettings = ({ setCurrentUser, navigation }: any) => {
  return (
    <SafeAreaView style={styles.background}>
      <Back navigation={navigation} />
      <ScrollView style={styles.buttonsContainer}>
        <ChangeRate />
        <ChangeUsername setCurrentUser={setCurrentUser} />
        <ChangeEmail />
        <ChangePassword />
        <DeleteAccount />
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
