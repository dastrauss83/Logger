import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconFeather from "react-native-vector-icons/Feather";
import MyButton from "../Components/Atoms/MyButton";
import LogNewLog from "../Components/Home Screen/LogNewLog";
import colors from "../config/colors";

const HomeScreen = ({ navigation }: any) => {
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
              name="poop"
              size={25}
              color={colors.first}
              style={{ marginRight: 10 }}
            />
          }
        />
        <MyButton
          onPress={() => navigation.navigate("AccountSettings")}
          containerColor={colors.third}
          textColor={colors.first}
          text={"Account Settings"}
          icon={
            <IconFeather
              name="settings"
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

export default HomeScreen;

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
