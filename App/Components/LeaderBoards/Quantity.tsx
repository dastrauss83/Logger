import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { firebaseUserCollection } from "../../../App";
import colors from "../../config/colors";
import { group, userInfo } from "../../Pages/AllGroups";
import Board from "./Board";

type QuantityProps = {
  group?: group;
};

const Quantity = ({ group }: QuantityProps) => {
  const [board, setBoard] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBoard = async () => {
      setLoading(true);
      const res = await firebaseUserCollection.get();
      const tempBoard = res.docs
        .filter((doc) => {
          return group
            ? group.users
                ?.map((user: userInfo) => {
                  return user.uid;
                })
                .includes(doc.data().uid)
            : true;
        })
        .map((doc) => {
          return [
            doc.data().customUserName,
            `${doc.data().logs.length} ${
              doc.data().logs.length === 1 ? "Log" : "Logs"
            }`,
            doc.id,
            doc.data().logs.length,
          ];
        });
      tempBoard.sort((a, b) => {
        return b[3] - a[3];
      });
      const refinedBoard = tempBoard.map((array: any, index: number) => {
        return [array[0], array[1], array[2], index];
      });
      setBoard(refinedBoard);
      setInterval(() => {
        setLoading(false);
      }, 500);
    };
    getBoard();
  }, []);

  if (loading)
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color={colors.second} />
      </View>
    );

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
        {board &&
          board.map((array: any, index: number) => (
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
