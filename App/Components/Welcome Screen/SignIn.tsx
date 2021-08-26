import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import MyButton from "../Atoms/MyButton";

const SignIn = ({ navigation }: any) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ top: 50, fontSize: 30, color: colors.second }}>
        Log In or Sign Up to get started
      </Text>
      <View style={styles.buttonsContainer}>
        <MyButton
          onPress={() => navigation.navigate("LogIn")}
          containerColor={colors.second}
          textColor={colors.first}
          icon={
            <Icon
              name="login"
              size={25}
              color={colors.first}
              style={{ position: "absolute", left: 20, top: 23 }}
            />
          }
          text={"Log In"}
        />
        <MyButton
          onPress={() => navigation.navigate("SignUp")}
          containerColor={colors.third}
          textColor={colors.first}
          text={"Sign Up"}
          icon={
            <Icon
              name="adduser"
              size={25}
              color={colors.first}
              style={{ position: "absolute", left: 20, top: 23 }}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingTop: 100,
    width: "100%",
  },
  screen: {
    backgroundColor: colors.first,
    width: "100%",
    height: "100%",
  },
  screenContent: {
    alignItems: "center",
  },
});
