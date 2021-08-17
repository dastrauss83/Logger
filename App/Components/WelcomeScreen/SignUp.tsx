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

const SignUp = () => {
  const [email, onChangeEmail] = useState<string>("");
  const [password, onChangePassword] = useState<string>("");
  const { setCurrentUser } = useUserContext();

  const handleSignUp = ({ navigation }: any) => {
    if (email === "" || password === "")
      return Alert.alert(
        "Failed to Sign Up",
        "Please ensure you have entered both a Email and Password",
        [{ text: "Ok" }]
      );
    if (password.length < 6)
      return Alert.alert(
        "Failed to Sign Up",
        "Please ensure your Password is more than 6 characters",
        [{ text: "Ok" }]
      );
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        storeCurrentUser(userCredential.user);
      });
    onChangeEmail("");
    onChangePassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text style={{ top: 20, fontSize: 30, color: colors.first }}>
          Sign up to shoot your shot!
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"Email"}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: colors.third,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 20,
  },
  loginText: {
    fontSize: 25,
    color: colors.first,
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
