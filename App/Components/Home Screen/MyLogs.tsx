import firebase from "firebase";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import Back from "../Atoms/Back";
import LogNewLog from "./LogNewLog";
import LogCard from "./MyLogs/LogCard";

const MyLogs = () => {
  const [userLogs, setUserLogs] = useState<any>(["poo"]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useUserContext();

  const getUserLogs = async () => {
    setLoading(true);
    const response: any = (
      await firebase.firestore().collection("users").doc(currentUser.uid).get()
    ).data();
    const tempUserLogs = response.logs;
    setUserLogs(tempUserLogs);
    setInterval(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getUserLogs();
  }, []);

  useEffect(() => {
    getUserLogs();
  }, [refresh]);

  if (loading)
    return (
      <View style={styles.screen}>
        <Back />
        <ActivityIndicator size="large" color={colors.second} />
      </View>
    );

  return (
    <SafeAreaView>
      <Back />
      {userLogs.length < 1 ? (
        <View style={styles.screen}>
          <Text
            style={{ fontSize: 30, color: colors.second, marginBottom: 15 }}
          >
            Log your first Log now!
          </Text>
          <LogNewLog refresh={refresh} setRefresh={setRefresh} />
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
          {userLogs.map((log: any, index: number) => (
            <LogCard
              log={log}
              key={index}
              index={index}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
          <LogNewLog
            refresh={refresh}
            setRefresh={setRefresh}
            style={{
              marginBottom: 50,
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyLogs;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
