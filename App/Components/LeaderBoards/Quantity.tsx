import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { firebaseUserCollection } from "../../../App";
import colors from "../../config/colors";
import Board from "./Board";

const Quantity = () => {
  const [board, setBoard] = useState<any>([]);

  useEffect(() => {
    const getBoard = async () => {
      const res = await firebaseUserCollection.get();
      const tempBoard = res.docs.map((doc) => {
        return [
          doc.data().customUserName,
          `${doc.data().logs.length} ${
            doc.data().logs.length === 1 ? "Log" : "Logs"
          }`,
        ];
      });
      setBoard(tempBoard);
    };
    getBoard();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.topText}>All Time Leaders by Quantity</Text>
      <View style={styles.header}>
        <View style={[styles.headerCategory, styles.userCateogry]}>
          <Text style={styles.headerText}>User</Text>
        </View>
        <View style={styles.headerCategory}>
          <Text style={styles.headerText}>Quantity</Text>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {board.map((array: any, index: number) => (
          <Board array={array} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quantity;

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
    borderBottomWidth: 5,
  },
  userCateogry: {
    borderRightColor: colors.third,
    borderRightWidth: 1,
  },
  headerText: { fontSize: 25, color: colors.third, marginBottom: 5 },
});
