import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Earned from "../Components/LeaderBoards/Earned";
import colors from "../config/colors";

export type LeaderBoards = "$ Earned" | "Quantity" | "Time";

const LeaderBoards = () => {
  const [board, setBoard] = useState<LeaderBoards>("$ Earned");

  const handlePress = () => {
    return null;
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.topButtons}>
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
        <Button
          onPress={() => setBoard("Time")}
          title={"Time"}
          color={colors.third}
        />
      </View>
      {board === "$ Earned" && <Earned />}
      {board === "Quantity" && <Text>quant</Text>}
      {board === "Time" && <Text>time</Text>}
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
