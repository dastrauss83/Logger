import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";

const SignIn = ({ navigation }: any) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ top: 50, fontSize: 30, color: colors.first }}>
        Log In or Sign Up to get started
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Icon
            name="login"
            size={25}
            color={colors.second}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.registerButton}
        >
          <Icon
            name="adduser"
            size={25}
            color={colors.second}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.registerText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  buttonsContainer: {
    paddingTop: 100,
    width: "80%",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.first,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
  registerText: {
    fontSize: 25,
    color: colors.first,
  },
  loginText: {
    fontSize: 25,
    color: colors.second,
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.third,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  screen: {
    backgroundColor: colors.second,
    width: "100%",
    height: "100%",
  },
  screenContent: {
    alignItems: "center",
  },
});
