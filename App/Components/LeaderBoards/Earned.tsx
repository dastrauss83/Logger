import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import colors from "../../config/colors";

const Earned = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const getBoard = async () => {};
    getBoard();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.topText}>All Time Leaders by $ Earned</Text>
      <View style={styles.header}>
        <View style={[styles.headerCategory, styles.userCateogry]}>
          <Text style={styles.headerText}>User</Text>
        </View>
        <View style={styles.headerCategory}>
          <Text style={styles.headerText}>$ Earned</Text>
        </View>
      </View>
      <ScrollView style={styles.container}></ScrollView>
    </SafeAreaView>
  );
};

export default Earned;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
  },
  topText: {
    textAlign: "center",
    fontSize: 30,
    color: colors.second,
    borderBottomColor: colors.third,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 15,
  },
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
  headerText: { fontSize: 20, color: colors.second, marginBottom: 5 },
});
