import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconFeather from "react-native-vector-icons/Feather";
import { storeCurrentUser } from "../../App";
import colors from "../config/colors";
import MyButton from "./Atoms/MyButton";

const Menu = ({ currentUser, setCurrentUser }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const logout = () => {
    firebase.auth().signOut();
    setCurrentUser({ customUserName: "noUser", uid: "" });
    storeCurrentUser("noUser");
  };
  return (
    <TouchableOpacity
      onPress={() => setShowModal(!showModal)}
      style={styles.logoContainer}
    >
      <Text style={{ fontSize: 25, color: colors.second, marginRight: 4 }}>
        {currentUser.customUserName}
      </Text>
      <Image source={require("../Assets/poo.png")} style={styles.logo} />
      <Modal animationType="slide" visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <MyButton
              onPress={logout}
              containerColor={colors.second}
              textColor={colors.first}
              text={"Log Out"}
              style={{ width: "88%" }}
              icon={
                <Icon
                  name="logout"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
            />
            <MyButton
              onPress={() => {
                navigation.navigate("AccountSettings");
                setShowModal(false);
              }}
              containerColor={colors.second}
              textColor={colors.first}
              text={"Account Settings"}
              style={{ width: "88%" }}
              icon={
                <IconFeather
                  name="settings"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
            />
            <MyButton
              onPress={() => setShowModal(false)}
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
    </TouchableOpacity>
  );
};

export default Menu;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    position: "absolute",
    zIndex: 100,
    top: 30,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
  },
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
