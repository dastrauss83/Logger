import firebase from "firebase";
import React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { storeCurrentUser } from "../../App";
import colors from "../config/colors";
import { useUserContext } from "../UserContext";
import MyButton from "./Atoms/MyButton";

const Menu = ({ navigation }: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useUserContext();

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
              icon={
                <Icon
                  name="logout"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
            />
            <MyButton
              onPress={() => setShowModal(false)}
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
    top: 40,
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
