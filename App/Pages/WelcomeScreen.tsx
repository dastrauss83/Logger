import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SignIn from "../Components/Welcome Screen/SignIn";
import colors from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../Components/Welcome Screen/LogIn";
import Icon from "react-native-vector-icons/MaterialIcons";
import MyButton from "../Components/Atoms/MyButton";

export const WelcomeScreen = ({ navigation }: any) => {
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
            <View style={{ width: "100%" }}>
              <MyButton
                containerColor={colors.third}
                textColor={colors.first}
                text={"Leader Boards"}
                icon={
                  <Icon
                    name="leaderboard"
                    size={25}
                    color={colors.first}
                    style={{ marginRight: 10 }}
                  />
                }
                onPress={() => navigation.navigate("LeaderBoards")}
              />
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
});
