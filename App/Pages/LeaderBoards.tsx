import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Earned from "../Components/LeaderBoards/Earned";
import Quantity from "../Components/LeaderBoards/Quantity";
import Time from "../Components/LeaderBoards/Time";
import colors from "../config/colors";

export type LeaderBoards = "$ Earned" | "Quantity" | "Time";

const LeaderBoards = () => {
  const [board, setBoard] = useState<LeaderBoards>("Time");

  const handlePress = () => {
    return null;
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.topButtons}>
        <Button
          onPress={() => setBoard("Time")}
          title={"Time"}
          color={colors.third}
        />
        <Button
          onPress={() => setBoard("$ Earned")}
          title={"$ Earned"}
          color={colors.third}
        />
        <Button
          onPress={() => setBoard("Quantity")}
          title={"Quantity"}
          color={colors.third}
        />
      </View>
      {board === "Time" && <Time />}
      {board === "$ Earned" && <Earned />}
      {board === "Quantity" && <Quantity />}
    </SafeAreaView>
  );
};

export default LeaderBoards;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
  },
  topButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
  },
});
