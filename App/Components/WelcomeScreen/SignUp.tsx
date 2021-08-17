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
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeCurrentUser } from "../../../App";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";

const SignUp = () => {
  const [userName, onChangeUserName] = useState<string>("");
  const [email, onChangeEmail] = useState<string>("");
  const [password, onChangePassword] = useState<string>("");
  const { setCurrentUser } = useUserContext();

  const handleSignUp = async () => {
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
    if (userName.length > 14)
      return Alert.alert(
        "Failed to Sign Up",
        "Please ensure your User Name is less than 15 characters",
        [{ text: "Ok" }]
      );
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const firebaseUser = response.user;
    const user: any = { ...firebaseUser };
    user.customUserName = userName;
    setCurrentUser({ uid: user.uid, customUserName: user.customUserName });
    storeCurrentUser({ uid: user.uid, customUserName: user.customUserName });
    firebase
      .firestore()
      .collection("users")
      .doc(`${user.uid}`)
      .set({ uid: user.uid, customUserName: user.customUserName });
    onChangeUserName("");
    onChangeEmail("");
    onChangePassword("");
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.second }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={{ alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Image
              source={require("../../Assets/poo.png")}
              style={styles.logo}
            />
          </View>
          <Text style={{ top: 20, fontSize: 30, color: colors.first }}>
            Join the Leader Boards!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={onChangeUserName}
              placeholder={"Username"}
              autoCapitalize="none"
            />
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
});
