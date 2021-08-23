import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../../config/colors";
import MyInput from "../../../Atoms/MyInput";

type GroupNameProps = {
  groupName: string;
  setGroupName: (e: string) => void;
};

const GroupName = ({ groupName, setGroupName }: GroupNameProps) => {
  return (
    <View style={styles.container}>
      <MyInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder={"Group Name"}
        textAlign="center"
        style={[styles.input]}
      />
    </View>
  );
};

export default GroupName;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.second,
    color: colors.first,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
  },
});
