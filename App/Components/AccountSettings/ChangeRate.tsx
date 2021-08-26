import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconFont from "react-native-vector-icons/FontAwesome";
import { firebaseUserCollection } from "../../../App";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import MyButton from "../Atoms/MyButton";
import MyInput from "../Atoms/MyInput";

const ChangeRate = () => {
  const [rateModal, setRateModal] = useState<boolean>(false);
  const [newRate, setNewRate] = useState<string>("");
  const { currentUser } = useUserContext();

  const handleChangeRate = async () => {
    await firebaseUserCollection.doc(currentUser.uid).update({
      rate: newRate,
    });
    setRateModal(false);
    setNewRate("");
  };

  return (
    <>
      <MyButton
        onPress={() => setRateModal(true)}
        containerColor={colors.third}
        textColor={colors.first}
        text={"Change Rate"}
        icon={
          <IconFont
            name="dollar"
            size={25}
            color={colors.first}
            style={{ position: "absolute", left: 22, top: 23 }}
          />
        }
      />
      <Modal animationType="slide" visible={rateModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <MyInput
              placeholder={"New Rate"}
              value={newRate}
              onChangeText={setNewRate}
              style={{
                backgroundColor: colors.second,
                color: colors.first,
                width: "88%",
              }}
              keyboardType={"number-pad"}
            />
            <MyButton
              onPress={handleChangeRate}
              containerColor={colors.second}
              textColor={colors.first}
              text={"Change"}
              style={{ width: "88%" }}
              icon={
                <IconFont
                  name="dollar"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
            />
            <MyButton
              onPress={() => setRateModal(false)}
              containerColor={colors.third}
              textColor={colors.first}
              text={"Close Menu"}
              style={{ width: "88%" }}
              icon={
                <Icon
                  name="back"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ChangeRate;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "91%",
    backgroundColor: colors.first,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModal: {
    backgroundColor: colors.third,
    marginBottom: 0,
  },
});
