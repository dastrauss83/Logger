import React, { useState } from "react";
import { StyleSheet, Modal, ScrollView, View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import colors from "../../../config/colors";
import { group, userInfo } from "../../../Pages/AllGroups";
import MyButton from "../../Atoms/MyButton";
import InteractWithGroup from "./GroupCard/InteractWithGroup";

type GroupCardProps = {
  group: group;
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

const GroupCard = ({ group, refresh, setRefresh }: GroupCardProps) => {
  const [cardModal, setCardModal] = useState<boolean>(false);

  return (
    <>
      <MyButton
        onPress={() => setCardModal(true)}
        containerColor={colors.second}
        textColor={colors.first}
        text={group.name}
        icon={
          <IconMaterial
            name="groups"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
      <Modal animationType="slide" visible={cardModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
              <View style={styles.wrapper}>
                <InteractWithGroup
                  group={group}
                  setCardModal={setCardModal}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </View>
              <View style={styles.wrapper}>
                <View style={styles.admin}>
                  <Text style={styles.title}>Group Admin:</Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 30,
                      color: colors.second,
                      width: "80%",
                    }}
                  >
                    {group.admin?.customUserName}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapper}>
                <View style={styles.admin}>
                  <Text style={styles.title}>Group Members:</Text>
                  {group.users?.map((user: userInfo) => {
                    return (
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: colors.second,
                          width: "80%",
                        }}
                        key={user.uid}
                      >
                        {user.customUserName}
                      </Text>
                    );
                  })}
                </View>
              </View>
              <MyButton
                onPress={() => setCardModal(false)}
                containerColor={colors.third}
                textColor={colors.first}
                text={"Close"}
                icon={
                  <Icon
                    name="back"
                    size={25}
                    color={colors.first}
                    style={{ marginRight: 10 }}
                  />
                }
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  },
  modalView: {
    width: "90%",
    height: "75%",
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
  wrapper: {
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
  },
  admin: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: colors.second,
    width: "80%",
    fontStyle: "italic",
  },
});
