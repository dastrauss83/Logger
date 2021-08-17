import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import SignIn from "../Components/WelcomeScreen/SignIn";
import colors from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../Components/WelcomeScreen/LogIn";

export const WelcomeScreen = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.first }} />
      <SafeAreaView style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.logoContainer}>
            <View>
              <Image
                source={require("../Assets/poo.png")}
                style={styles.logo}
              />
            </View>
            <View style={{ width: "80%" }}>
              <TouchableOpacity
                style={[styles.leaderBoardsButton, { width: "80%" }]}
              >
                <Text style={styles.leaderBoardsText}>Leader Boards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.bottom}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="LogIn" component={LogIn} />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.second,
  },
  bottom: {
    height: "50%",
    width: "100%",
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  logoContainer: {
    flex: 1,
    height: "50%",
    paddingTop: 20,
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.first,
  },
  introText: {
    fontSize: 30,
    color: colors.second,
  },
  leaderBoardsButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.third,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  leaderBoardsText: {
    fontSize: 25,
    color: colors.first,
  },
});
