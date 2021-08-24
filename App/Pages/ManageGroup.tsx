import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { firebaseGroupCollection } from "../../App";
import Back from "../Components/Atoms/Back";
import colors from "../config/colors";
import RequesterCard from "../Components/Home Screen/Groups/ManageGroups/RequesterCard";
import { userInfo } from "./AllGroups";

const ManageGroup = ({
  route: {
    params: { group, refresh, setRefresh },
  },
}: any) => {
  const [requesters, setRequesters] = useState<userInfo[]>();
  const [refresh2, setRefresh2] = useState<boolean>(false);

  const getRequesters = async () => {
    const response: any = (
      await firebaseGroupCollection.doc(group.id).get()
    ).data();
    const tempRequesters = response.requesters;
    setRequesters(tempRequesters);
  };

  useEffect(() => {
    getRequesters();
  }, []);

  useEffect(() => {
    getRequesters();
  }, [refresh2]);

  return (
    <SafeAreaView style={styles.background}>
      <Back />
      <View style={styles.topTextWrapper}>
        <Text style={styles.topText}>{group.name}</Text>
        <Text style={styles.bottomText}>
          Reject or Accept all group requests
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {requesters !== [] &&
          requesters?.map((requester: userInfo) => {
            return (
              <RequesterCard
                key={requester.uid}
                requester={requester}
                requesters={requesters}
                group={group}
                refresh={refresh}
                setRefresh={setRefresh}
                refresh2={refresh2}
                setRefresh2={setRefresh2}
              />
            );
          })}
        {(requesters === [] || requesters?.length === 0) && (
          <Text style={styles.noRequestedText}>No join requests</Text>
        )}
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
  noRequestedText: {
    color: colors.second,
    fontSize: 30,
    marginTop: 100,
  },
});
