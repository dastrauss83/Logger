import React from "react";
import { Alert, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import colors from "../../../../config/colors";
import { group, userInfo } from "../../../../Pages/AllGroups";
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

  const handleLeave = async () => {
    const userIndex = group.users
      .map((user: userInfo) => {
        return user.uid;
      })
      .indexOf(currentUser.uid);
    const tempUsers = [...group.users];
    tempUsers.splice(userIndex, 1);
    await firebaseGroupCollection.doc(group.id).update({
      users: tempUsers,
    });
    setCardModal(false);
    setRefresh && setRefresh(!refresh);
  };

  const handleJoin = async () => {
    const tempRequesters = [...group.requesters];
    tempRequesters.push({
      uid: currentUser.uid,
      customUserName: currentUser.customUserName,
    });
    await firebaseGroupCollection.doc(group.id).update({
      requesters: tempRequesters,
    });
    Alert.alert(
      "Request Received",
      "The admin has been notified and will either accept or deny your join request",
      [
        {
          text: "Ok",
          onPress: async () => setCardModal(false),
        },
      ]
    );
    setRefresh && setRefresh(!refresh);
  };

  const handleCancelRequest = async () => {
    Alert.alert("Are you sure?", "Your join request will be retracted", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          const userIndex = group.users
            .map((user: userInfo) => {
              return user.uid;
            })
            .indexOf(currentUser.uid);
          const tempRequesters = [...group.requesters];
          tempRequesters.splice(userIndex, 1);
          await firebaseGroupCollection.doc(group.id).update({
            requesters: tempRequesters,
          });
          setRefresh && setRefresh(!refresh);
          setCardModal(false);
        },
      },
    ]);
  };

  if (group.admin?.uid === currentUser.uid) {
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

  if (
    group.users
      .map((user: userInfo) => {
        return user.uid;
      })
      .includes(currentUser.uid)
  ) {
    return (
      <MyButton
        containerColor={"red"}
        textColor={colors.first}
        text={"Leave Group"}
        onPress={handleLeave}
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
    !group.users
      ?.map((user: userInfo) => {
        return user.uid;
      })
      .includes(currentUser.uid) &&
    !group.requesters
      ?.map((user: userInfo) => {
        return user.uid;
      })
      .includes(currentUser.uid)
  ) {
    return (
      <MyButton
        containerColor={colors.second}
        textColor={colors.first}
        text={"Join Group"}
        onPress={handleJoin}
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

  if (
    group.requesters
      ?.map((user: userInfo) => {
        return user.uid;
      })
      .includes(currentUser.uid)
  ) {
    return (
      <MyButton
        containerColor={colors.third}
        textColor={colors.first}
        text={"Pending Approval..."}
        onPress={handleCancelRequest}
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
