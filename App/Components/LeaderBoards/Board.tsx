import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../../config/colors";
import { useUserContext } from "../../UserContext";

type BoardProps = {
  array: any;
};

const Board = ({ array }: BoardProps) => {
  const { currentUser } = useUserContext();

  return (
    <View style={styles.header}>
      <View style={[styles.headerCategory, styles.userCateogry]}>
        <Text
          style={[
            styles.headerText,
            currentUser.uid === array[2] && { color: colors.third },
          ]}
        >
          {(array[3] === 0 || array[3] === 1 || array[3] === 2) && (
            <Icon
              name="trophy"
              size={20}
              color={
                array[3] === 0
                  ? "gold"
                  : array[3] === 1
                  ? "silver"
                  : array[3] === 2
                  ? "bronze"
                  : "blue"
              }
            />
          )}
          {array[0]}
        </Text>
      </View>
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
    width: "90%",
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
    fontSize: 20,
    color: colors.second,
    marginLeft: 7,
    marginBottom: 5,
    marginTop: 5,
  },
});
