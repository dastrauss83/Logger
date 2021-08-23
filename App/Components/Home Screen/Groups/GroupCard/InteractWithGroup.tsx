import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import colors from "../../../../config/colors";
import { group } from "../../../../Pages/AllGroups";
import { useUserContext } from "../../../../UserContext";
import MyButton from "../../../Atoms/MyButton";
import { firebaseGroupCollection } from "../../../../../App";

type InteractWithGroupProps = {
  group: group;
  setCardModal: (e: boolean) => void;
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const InteractWithGroup = ({
  group,
  setCardModal,
  refresh,
  setRefresh,
}: InteractWithGroupProps) => {
  const { currentUser } = useUserContext();

  const handleDelete = () => {
    Alert.alert(
      "Are you sure?",
      "This group will be deleted and all of the members will be removed",
      [
        { text: "No" },
        {
          text: "Delete",
          onPress: async () => {
            await firebaseGroupCollection.doc(group.id).delete();
            setRefresh && setRefresh(!refresh);
            setCardModal(false);
          },
        },
      ]
    );
  };

  if (group.adminID === currentUser.uid) {
    return (
      <MyButton
        containerColor={"red"}
        textColor={colors.first}
        text={"Delete Group"}
        onPress={handleDelete}
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
