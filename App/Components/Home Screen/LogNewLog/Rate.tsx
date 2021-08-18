import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import colors from "../../../config/colors";
import { useUserContext } from "../../../UserContext";
import MyInput from "../../Atoms/MyInput";
import { Picker } from "@react-native-picker/picker";
import MyButton from "../../Atoms/MyButton";

type RateProps = {
  rate: string;
  setRate: (e: string) => void;
  rateType: string;
  setRateType: (e: string) => void;
};

const Rate = ({ rate, setRate, rateType, setRateType }: RateProps) => {
  const [rateModal, setRateModal] = useState<boolean>(false);
  const { currentUser } = useUserContext();

  useEffect(() => {
    const getUserRate = async () => {
      const response: any = (
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUser.uid)
          .get()
      ).data();
      const tempUserRate = response.rate;
      setRate(tempUserRate);
    };
    getUserRate();
  }, []);

  return (
    <View style={styles.container}>
      <MyInput
        value={rate}
        onChangeText={setRate}
        placeholder={"$/hr"}
        keyboardType={"number-pad"}
        textAlign="center"
        style={[styles.input]}
      />
      <MyButton
        onPress={() => setRateModal(true)}
        containerColor={colors.second}
        textColor={colors.first}
        text={rateType}
        style={{ width: "25%", marginRight: 20 }}
      />
      <Modal animationType="slide" visible={rateModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <MyButton
              onPress={() => {
                setRateType("$/hr");
                setRateModal(false);
              }}
              containerColor={colors.second}
              textColor={colors.first}
              text={"$/hr"}
            />
            <MyButton
              onPress={() => {
                setRateType("$/yr");
                setRateModal(false);
              }}
              containerColor={colors.second}
              textColor={colors.first}
              text={"$/yr"}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Rate;

const styles = StyleSheet.create({
  input: {
    width: "25%",
    backgroundColor: colors.second,
    color: colors.first,
    marginLeft: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
  },
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
});
