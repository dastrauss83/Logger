import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MyButton from "../Components/Atoms/MyButton";
import LogNewLog from "../Components/Home Screen/LogNewLog";
import colors from "../config/colors";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.buttonsContainer}>
        <LogNewLog />
        <MyButton
          onPress={() => navigation.navigate("MyLogs")}
          containerColor={colors.second}
          textColor={colors.first}
          text={"My Logs"}
          icon={
            <Icon
              name="pluscircleo"
              size={25}
              color={colors.first}
              style={{ marginRight: 10 }}
            />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

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
