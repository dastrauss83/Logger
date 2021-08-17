import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SignIn from "../Components/WelcomeScreen/SignIn";
import colors from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../Components/WelcomeScreen/LogIn";
import SignUp from "../Components/WelcomeScreen/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeCurrentUser = async (value: any) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem("currentUser", jsonValue);
};

export const WelcomeScreen = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.first }} />
      <SafeAreaView style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.logoContainer}>
            <Image source={require("../Assets/poo.png")} style={styles.logo} />
            <Text style={styles.introText}>Today could be your day!</Text>
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
            <Stack.Screen name="SignUp" component={SignUp} />
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
    height: "50%",
    paddingTop: 80,
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.first,
  },
  introText: {
    fontSize: 30,
    color: colors.second,
  },
});
