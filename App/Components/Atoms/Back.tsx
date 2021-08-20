import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";

type BackProps = {
  navigation: any;
  style?: any;
  color?: string;
};

const Back = ({ navigation, style, color }: BackProps) => {
  return (
    <View style={[styles.container, style]}>
      <Icon
        name="back"
        size={20}
        color={color || colors.third}
        style={{ marginRight: -4 }}
      />
      <Button
        onPress={() => navigation.goBack()}
        title={"Back"}
        color={color || colors.third}
      />
    </View>
  );
};

export default Back;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    top: 40,
    left: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
