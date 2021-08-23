import firebase from "firebase";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { storeCurrentUser } from "../../../App";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import Back from "../Atoms/Back";
import MyButton from "../Atoms/MyButton";
import MyInput from "../Atoms/MyInput";

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
    firebase.firestore().collection("users").doc(`${user.uid}`).set({
      uid: user.uid,
      customUserName: user.customUserName,
      logs: [],
      rate: "",
    });
    onChangeUserName("");
    onChangeEmail("");
    onChangePassword("");
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.second }}>
      <Back color={colors.first} />
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
            <MyInput
              value={userName}
              onChangeText={onChangeUserName}
              placeholder={"Username"}
              autoCapitalize="none"
            />
            <MyInput
              value={email}
              onChangeText={onChangeEmail}
              placeholder={"Email"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MyInput
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry={true}
              placeholder={"Password"}
            />
            <MyButton
              onPress={handleSignUp}
              icon={
                <Icon
                  name="adduser"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
              containerColor={colors.third}
              textColor={colors.first}
              text={"Sign Up"}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.second,
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: "100%",
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
});
