import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import IconFeather from "react-native-vector-icons/Feather";
import MyButton from "../Components/Atoms/MyButton";
import LogNewLog from "../Components/Home Screen/LogNewLog";
import colors from "../config/colors";

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView style={styles.buttonsContainer}>
        {/* <MyButton
          containerColor={colors.third}
          textColor={colors.first}
          text={"Leader Boards"}
          icon={
            <IconMaterial
              name="leaderboard"
              size={25}
              color={colors.first}
              style={{ position: "absolute", left: 20, top: 23 }}
            />
          }
          onPress={() => navigation.navigate("LeaderBoards")}
        /> */}
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
              style={{ position: "absolute", left: 20, top: 23 }}
            />
          }
        />
        {/* <MyButton
          onPress={() => navigation.navigate("MyGroups")}
          containerColor={colors.second}
          textColor={colors.first}
          text={"My Groups"}
          icon={
            <IconMaterial
              name="group"
              size={25}
              color={colors.first}
            style={{ position: "absolute", left: 20, top: 23 }}
            />
          }
        />
        <MyButton
          onPress={() => navigation.navigate("AllGroups")}
          containerColor={colors.second}
          textColor={colors.first}
          text={"All Groups"}
          icon={
            <IconMaterial
              name="groups"
              size={25}
              color={colors.first}
            style={{ position: "absolute", left: 20, top: 23 }}
            />
          }
        /> */}
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
              style={{ position: "absolute", left: 20, top: 23 }}
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
