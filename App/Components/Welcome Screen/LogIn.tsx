import firebase from "firebase";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { storeCurrentUser } from "../../../App";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import MyButton from "../Atoms/MyButton";

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
      .then(async (userCredential) => {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(`${userCredential.user?.uid}`)
          .get();
        const userData: any = userDoc.data();
        const user: any = { ...userCredential.user };
        user.customUserName = userData.customUserName;
        setCurrentUser({ uid: user.uid, customUserName: user.customUserName });
        storeCurrentUser({
          uid: user.uid,
          customUserName: user.customUserName,
        });
      })
      .catch(() => {
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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
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
        <MyButton
          onPress={handleLogin}
          containerColor={colors.first}
          textColor={colors.second}
          text={"Log In"}
          icon={
            <Icon
              name="login"
              size={25}
              color={colors.second}
              style={{ marginRight: 10 }}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.second,
    width: "100%",
    height: "100%",
  },
  screenContent: {
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginTop: 40,
  },
  input: {
    width: "80%",
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
