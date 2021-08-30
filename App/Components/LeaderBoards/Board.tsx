import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";
import { useNavigation } from "@react-navigation/native";

type BoardProps = {
  array: any;
};

const Board = ({ array }: BoardProps) => {
  const { currentUser } = useUserContext();
  const navigation = useNavigation<any>();

  const handleUserPress = () => {
    if (currentUser.uid === array[2]) {
      navigation.navigate("MyLogs");
    } else {
      navigation.navigate("OtherUserLogs", {
        userID: array[2],
        customUserName: array[0],
      });
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.headerCategory, styles.userCateogry]}
        onPress={handleUserPress}
        disabled={currentUser.customUserName === "noUser"}
      >
        <Text
          style={[
            styles.headerText,
            currentUser.uid === array[2] && { color: colors.third },
          ]}
        >
          {array[3] === 0 || array[3] === 1 || array[3] === 2 ? (
            <Icon
              name="trophy"
              size={17}
              color={
                array[3] === 0
                  ? "gold"
                  : array[3] === 1
                  ? "silver"
                  : array[3] === 2
                  ? "brown"
                  : "blue"
              }
            />
          ) : (
            `${array[3] + 1}.`
          )}
          {` ${array[0]}`}
        </Text>
      </TouchableOpacity>
      <View style={styles.headerCategory}>
        <Text
          style={[
            styles.headerText,
            currentUser.uid === array[2] && { color: colors.third },
          ]}
        >
          {array[1]}
        </Text>
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  header: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCategory: {
    width: "50%",
    justifyContent: "center",
    borderBottomColor: colors.third,
    borderBottomWidth: 1,
  },
  userCateogry: {
    borderRightColor: colors.third,
    borderRightWidth: 1,
  },
  headerText: {
    fontSize: 17,
    color: colors.second,
    marginLeft: 7,
    marginBottom: 5,
    marginTop: 5,
  },
});
