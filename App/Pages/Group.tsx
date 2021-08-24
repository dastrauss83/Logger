import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { group } from "./AllGroups";

const Group = (props: any) => {
  const group: group = props.route.params.group;
  return (
    <View>
      <Text>{group.name}</Text>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({});
