import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { firebaseGroupCollection } from "../../App";
import Back from "../Components/Atoms/Back";
import CreateNewGroup from "../Components/Home Screen/Groups/CreateNewGroup";
import GroupCard from "../Components/Home Screen/Groups/GroupCard";
import colors from "../config/colors";

export type userInfo = {
  uid: string;
  customUserName: string;
};
export type group = {
  admin: userInfo;
  name: string;
  users: userInfo[];
  requesters: userInfo[];
  id: string;
};

const AllGroups = () => {
  const [groups, setGroups] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getGroups = async () => {
    setLoading(true);
    const res = await firebaseGroupCollection.get();
    const tempGroups = res.docs.map((doc) => {
      return doc.data();
    });
    setGroups(tempGroups);
    setInterval(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {
    getGroups();
  }, [refresh]);

  if (loading)
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color={colors.second} />
      </View>
    );

  return (
    <SafeAreaView style={styles.background}>
      <Back />
      <ScrollView style={styles.buttonsContainer}>
        <CreateNewGroup refresh={refresh} setRefresh={setRefresh} />
        {groups &&
          groups.map((group: group) => {
            return (
              <GroupCard
                key={group.id}
                group={group}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllGroups;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    paddingTop: 75,
    width: "100%",
  },
});
