import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import IconAnt from "react-native-vector-icons/AntDesign";
import colors from "../../../../config/colors";
import MyButton from "../../../Atoms/MyButton";

type RequesterCardProps = {
  requester: string;
};

const RequesterCard = ({ requester }: RequesterCardProps) => {
  return (
    <View style={styles.requesterCard}>
      <Text style={[styles.bottomText, { marginBottom: 0, fontSize: 25 }]}>
        {requester}
      </Text>
      <View style={styles.buttonContainer}>
        <MyButton
          containerColor={"red"}
          textColor={colors.first}
          text={""}
          onPress={() => console.log("delete")}
          style={styles.button}
          icon={<Icon name="x" size={25} color={colors.first} />}
        />
        <MyButton
          containerColor={"green"}
          textColor={colors.first}
          text={""}
          onPress={() => console.log("add")}
          style={styles.button}
          icon={<IconAnt name="pluscircle" size={25} color={colors.first} />}
        />
      </View>
    </View>
  );
};

export default RequesterCard;

const styles = StyleSheet.create({
  requesterCard: {
    flexDirection: "row",
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.second,
    marginBottom: 15,
  },
  button: {
    width: "45%",
    height: 50,
    marginBottom: 0,
    marginTop: 0,
  },
});
