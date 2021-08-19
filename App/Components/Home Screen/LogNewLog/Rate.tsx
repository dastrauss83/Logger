import firebase from "firebase";
import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../config/colors";
import { useUserContext } from "../../../UserContext";
import MyInput from "../../Atoms/MyInput";

type RateProps = {
  rate: string;
  setRate: (e: string) => void;
};

const Rate = ({ rate, setRate }: RateProps) => {
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
      <View style={{ marginRight: 50 }}>
        <Text style={{ fontSize: 30 }}>$ / Hour</Text>
      </View>
    </View>
  );
};

export default Rate;

const styles = StyleSheet.create({
  input: {
    width: "25%",
    backgroundColor: colors.second,
    color: colors.first,
    marginLeft: 50,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
  },
});
