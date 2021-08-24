import "react-native-gesture-handler";
import React, { useEffect } from "react";
import {
  Alert,
  AppState,
  AppStateStatus,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { WelcomeScreen } from "./App/Pages/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./App/Pages/HomeScreen";
import firebase from "firebase";
import { useState } from "react";
import { UserContext } from "./App/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "./App/Components/Menu";
import SignUp from "./App/Components/Welcome Screen/SignUp";
import MyLogs from "./App/Components/Home Screen/MyLogs";
import AccountSettings from "./App/Pages/AccountSettings";
import LeaderBoards from "./App/Pages/LeaderBoards";
import * as Updates from "expo-updates";
import OtherUserLogs from "./App/Components/Home Screen/OtherUserLogs";
import AllGroups from "./App/Pages/AllGroups";
import MyGroups from "./App/Pages/MyGroups";
import Group from "./App/Pages/Group";
import ManageGroup from "./App/Pages/ManageGroup";

var firebaseConfig = {
  apiKey: "AIzaSyA6X4nIVhuhyLy4Vr0ZYXiZT3ISwcMKOFQ",
  authDomain: "poop-tracker-49c9f.firebaseapp.com",
  projectId: "poop-tracker-49c9f",
  storageBucket: "poop-tracker-49c9f.appspot.com",
  messagingSenderId: "287717069144",
  appId: "1:287717069144:web:59b7f9c2e175f622f7952d",
};
firebase.initializeApp(firebaseConfig);

export const firebaseUserCollection = firebase.firestore().collection("users");
export const firebaseGroupCollection = firebase
  .firestore()
  .collection("groups");

const Stack = createStackNavigator();

export const storeCurrentUser = async (value: any) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem("currentUser", jsonValue);
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>({
    customUserName: "noUser",
    uid: "",
  });

  useEffect(() => {
    const getUser = async () => {
      let value: any;
      const jsonValue = await AsyncStorage.getItem("currentUser");
      if (jsonValue !== null) {
        if (JSON.parse(jsonValue) === "noUser") {
          value = {
            customUserName: "noUser",
            uid: "",
          };
        } else {
          value = JSON.parse(jsonValue);
        }
        setCurrentUser(value);
      }
    };
    getUser();
  }, []);

  const checkForUpdates = async () => {
    Updates.checkForUpdateAsync().then(async (update) => {
      if (update.isAvailable) {
        Updates.fetchUpdateAsync().then(async () => {
          await new Promise((resolve) =>
            Alert.alert(
              "Required update",
              "your app will briefly restart",
              [{ text: "OK", onPress: () => resolve(true) }],
              { cancelable: false }
            )
          );
          await Updates.reloadAsync();
        });
      }
    });
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      setTimeout(checkForUpdates, 5000);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      AppState.addEventListener("change", handleAppStateChange);
      setTimeout(checkForUpdates, 5000);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          {currentUser.customUserName !== "noUser" && (
            <Menu currentUser={currentUser} setCurrentUser={setCurrentUser} />
          )}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {currentUser.customUserName === "noUser" ? (
              <>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MyLogs" component={MyLogs} />
                <Stack.Screen name="AccountSettings">
                  {() => <AccountSettings setCurrentUser={setCurrentUser} />}
                </Stack.Screen>
                <Stack.Screen name="OtherUserLogs" component={OtherUserLogs} />
                {/* <Stack.Screen name="AllGroups" component={AllGroups} />
                <Stack.Screen name="MyGroups" component={MyGroups} />
                <Stack.Screen name="Group" component={Group} />
                <Stack.Screen name="ManageGroup" component={ManageGroup} /> */}
              </>
            )}
            {/* <Stack.Screen name="LeaderBoards" component={LeaderBoards} /> */}
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
