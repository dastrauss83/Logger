import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { firebaseGroupCollection } from "../../App";
import Back from "../Components/Atoms/Back";
import colors from "../config/colors";
import { group } from "./AllGroups";

const ManageGroup = (props: any) => {
  const group: group = props.route.params.group;
  const [requesters, setRequesters] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const getRequesters = async () => {
    const response: any = (
      await firebaseGroupCollection.doc(group.id).get()
    ).data();
    const tempRequesters = response.requestersCustomUserName;
    setRequesters(tempRequesters);
  };

  useEffect(() => {
    getRequesters();
  }, []);

  useEffect(() => {
    getRequesters();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.background}>
      <Back />
      <View style={styles.topTextWrapper}>
        <Text style={styles.topText}>{group.name}</Text>
        <Text style={styles.bottomText}>
          Reject or Accept all group requests
        </Text>
      </View>
      <ScrollView style={styles.container}>
        {requesters.length > 0 &&
          requesters.map((requester: string) => {
            return <Text>{requester}</Text>;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageGroup;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
  },
  topText: {
    textAlign: "center",
    fontSize: 40,
    color: colors.second,
    marginTop: 40,
    marginBottom: 15,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.second,
    marginBottom: 15,
  },
  topTextWrapper: {
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  container: {
    width: "100%",
  },
});
