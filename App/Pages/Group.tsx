import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import Back from "../Components/Atoms/Back";
import MyButton from "../Components/Atoms/MyButton";
import Earned from "../Components/LeaderBoards/Earned";
import Quantity from "../Components/LeaderBoards/Quantity";
import Time from "../Components/LeaderBoards/Time";
import colors from "../config/colors";
import { useUserContext } from "../UserContext";
import { group } from "./AllGroups";
import { LeaderBoards } from "./LeaderBoards";

const Group = (props: any) => {
  const group: group = props.route.params.group;
  const [board, setBoard] = useState<LeaderBoards>("Time");
  const { currentUser } = useUserContext();
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.background}>
      <Back />
      <View style={styles.topTextWrapper}>
        <Text style={styles.topText}>{group.name}</Text>
        {group.adminID === currentUser.uid && (
          <>
            <MyButton
              containerColor={colors.second}
              textColor={colors.first}
              text={"Manage Group"}
              onPress={() =>
                navigation.navigate("ManageGroup", {
                  group: group,
                })
              }
              style={{ marginTop: 0, width: "60%" }}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{group.requestersID?.length}</Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.topButtons}>
        <Button
          onPress={() => setBoard("Time")}
          title={"Time"}
          color={colors.third}
        />
        <Button
          onPress={() => setBoard("$ Earned")}
          title={"$ Earned"}
          color={colors.third}
        />
        <Button
          onPress={() => setBoard("Quantity")}
          title={"Quantity"}
          color={colors.third}
        />
      </View>
      {board === "Time" && <Time group={group} />}
      {board === "$ Earned" && <Earned group={group} />}
      {board === "Quantity" && <Quantity group={group} />}
    </SafeAreaView>
  );
};

export default Group;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.first,
    flex: 1,
  },
  topButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  topText: {
    textAlign: "center",
    fontSize: 40,
    color: colors.second,
    borderBottomColor: colors.third,
    borderBottomWidth: 1,
    marginTop: 40,
    marginBottom: 15,
  },
  topTextWrapper: {
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  badge: {
    bottom: "52%",
    left: "75%",
    backgroundColor: "red",
    borderRadius: 100,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30,
  },
  badgeText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.first,
    fontWeight: "700",
  },
});
