import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import colors from "../../config/colors";

type BoardProps = {
  array: any;
};

const Board = ({ array }: BoardProps) => {
  return (
    <View style={styles.header}>
      <View style={[styles.headerCategory, styles.userCateogry]}>
        <Text style={styles.headerText}>{array[0]}</Text>
      </View>
      <View style={styles.headerCategory}>
        <Text style={styles.headerText}>{array[1]}</Text>
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  header: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCategory: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.third,
    borderBottomWidth: 1,
  },
  userCateogry: {
    borderRightColor: colors.third,
    borderRightWidth: 1,
  },
  headerText: {
    fontSize: 20,
    color: colors.second,
    marginBottom: 5,
    marginTop: 5,
  },
});
