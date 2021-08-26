import React, { useState } from "react";
import { StyleSheet, Modal, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../config/colors";
import MyButton from "../../Atoms/MyButton";
import FinalButtons from "./CreateNewGroup/FinalButtons";
import GroupName from "./CreateNewGroup/GroupName";
import PromptText from "./CreateNewGroup/PromptText";

type CreateNewGroupProps = {
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const CreateNewGroup = ({ refresh, setRefresh }: CreateNewGroupProps) => {
  const [newGroupModal, setNewGroupModal] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");

  return (
    <>
      <MyButton
        onPress={() => setNewGroupModal(true)}
        containerColor={colors.third}
        textColor={colors.first}
        text={"New Group"}
        icon={
          <Icon
            name="pluscircleo"
            size={25}
            color={colors.first}
            style={{ position: "absolute", left: 20, top: 23 }}
          />
        }
      />
      <Modal animationType="slide" visible={newGroupModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
              <PromptText />
              <GroupName groupName={groupName} setGroupName={setGroupName} />
              <FinalButtons
                setNewGroupModal={setNewGroupModal}
                groupName={groupName}
                setGroupName={setGroupName}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CreateNewGroup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  modalView: {
    width: "91%",
    height: "50%",
    backgroundColor: colors.first,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: colors.second,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 50,
  },
});
