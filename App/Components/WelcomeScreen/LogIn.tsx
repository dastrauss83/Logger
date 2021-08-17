import firebase from "firebase";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import colors from "../../config/colors";
import { storeCurrentUser } from "../../Pages/WelcomeScreen";
import { useUserContext } from "../../UserContext";

const LogIn = () => {
  const [email, onChangeEmail] = useState<string>("");
  const [password, onChangePassword] = useState<string>("");

  const { setCurrentUser } = useUserContext();

  const handleLogin = () => {
    if (email === "" || password === "")
      return Alert.alert(
        "Failed to Log In",
        "Please ensure you have entered both a Email and Password",
        [{ text: "Ok" }]
      );
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        storeCurrentUser(userCredential.user);
      })
      .catch((error) => {
        Alert.alert(
          "Failed to Log In",
          "Please ensure you have entered your Email and Password correctly",
          [{ text: "Ok" }]
        );
        onChangeEmail("");
        onChangePassword("");
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text style={{ top: 20, fontSize: 30, color: colors.first }}>
          Log In to an existing account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"Email"}
            autoCompleteType="email"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={true}
            placeholder={"Password"}
            autoCompleteType="password"
            textContentType="none"
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.first,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
  loginText: {
    fontSize: 25,
    color: colors.second,
  },
  screen: {
    backgroundColor: colors.second,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: "80%",
    marginTop: 40,
  },
  input: {
    width: "100%",
    height: 70,
    backgroundColor: colors.first,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
    fontSize: 30,
    padding: 10,
  },
});
