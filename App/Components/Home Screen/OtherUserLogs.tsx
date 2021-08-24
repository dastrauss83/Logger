import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";
import colors from "../../config/colors";
import Back from "../Atoms/Back";
import LogCard from "./MyLogs/LogCard";

const OtherUserLogs = ({
  route: {
    params: { userID, customUserName },
  },
}: any) => {
  const [userLogs, setUserLogs] = useState<any>(["poo"]);

  const getUserLogs = async () => {
    const response: any = (
      await firebase.firestore().collection("users").doc(userID).get()
    ).data();
    const tempUserLogs = response.logs;
    setUserLogs(tempUserLogs);
  };

  useEffect(() => {
    getUserLogs();
  }, []);

  return (
    <SafeAreaView>
      <Back />
      {userLogs.length < 1 ? (
        <View style={styles.screen}>
          <Text
            style={{
              fontSize: 30,
              color: colors.second,
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            {customUserName} has yet to Log a Log.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 40,
          }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 30, color: colors.second, marginBottom: 15 }}
          >
            {customUserName}
          </Text>
          {userLogs.map((log: any, index: number) => (
            <LogCard log={log} key={index} index={index} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OtherUserLogs;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
