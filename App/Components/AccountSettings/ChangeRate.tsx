import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
          <Icon
            name="dollar"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
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
              style={{ backgroundColor: colors.second, color: colors.first }}
              keyboardType={"number-pad"}
            />
            <MyButton
              onPress={handleChangeRate}
              containerColor={colors.second}
              textColor={colors.first}
              text={"Change"}
              icon={
                <Icon
                  name="user"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
            />
            <MyButton
              onPress={() => setRateModal(false)}
              containerColor={colors.third}
              textColor={colors.first}
              text={"Close Menu"}
              style={{ marginBottom: 0 }}
              icon={
                <Icon
                  name="back"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
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
    width: "80%",
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
