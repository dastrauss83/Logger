import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Back from "../Components/Atoms/Back";
import CreateNewGroup from "../Components/Home Screen/Groups/CreateNewGroup";
import colors from "../config/colors";

const AllGroups = () => {
  return (
    <SafeAreaView style={styles.background}>
      <Back />
      <ScrollView style={styles.buttonsContainer}>
        <CreateNewGroup />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllGroups;

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
