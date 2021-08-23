import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import colors from "../../../../config/colors";
import { group } from "../../../../Pages/AllGroups";
import { useUserContext } from "../../../../UserContext";
import MyButton from "../../../Atoms/MyButton";

type InteractWithGroupProps = {
  group: group;
};

const InteractWithGroup = ({ group }: InteractWithGroupProps) => {
  const { currentUser } = useUserContext();

  if (group.adminID === currentUser.uid) {
    return (
      <MyButton
        containerColor={"red"}
        textColor={colors.first}
        text={"Delete Group"}
        onPress={() => console.log("Delete")}
        icon={
          <IconMaterial
            name="delete"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
    );
  }

  if (group.usersID.indexOf(currentUser.uid) !== 1) {
    return (
      <MyButton
        containerColor={"red"}
        textColor={colors.first}
        text={"Leave Group"}
        onPress={() => console.log("Leave")}
        icon={
          <IconAnt
            name="back"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
    );
  }

  if (
    group.usersID.indexOf(currentUser.uid) === -1 &&
    group.requestedsID.indexOf(currentUser.uid) === -1
  ) {
    return (
      <MyButton
        containerColor={colors.second}
        textColor={colors.first}
        text={"Join Group"}
        onPress={() => console.log("Join")}
        icon={
          <IconAnt
            name="pluscircleo"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
    );
  }

  if (group.requestedsID.indexOf(currentUser.uid) === -1) {
    return (
      <MyButton
        containerColor={colors.third}
        textColor={colors.first}
        text={"Pending..."}
        onPress={() => console.log("pending")}
        icon={
          <Icon
            name="clock"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
    );
  }
  return null;
};

export default InteractWithGroup;

const styles = StyleSheet.create({});
