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
import colors from "../config/colors";
import { storeCurrentUser } from "../Pages/WelcomeScreen";
import { useUserContext } from "../UserContext";

const Menu = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setCurrentUser } = useUserContext();

  const logout = () => {
    firebase.auth().signOut();
    setCurrentUser("noUser");
    storeCurrentUser("noUser");
  };
  return (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.logoContainer}
    >
      <Image source={require("../Assets/poo.png")} style={styles.logo} />
      <Modal animationType="slide" visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.logoutContainer]}
              onPress={logout}
            >
              <Text style={{ fontSize: 25, color: colors.first }}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.closeModal]}
              onPress={() => setShowModal(false)}
            >
              <Text style={{ fontSize: 25, color: colors.first }}>
                Close Menu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default Menu;

const styles = StyleSheet.create({
  logoutContainer: {
    backgroundColor: colors.second,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    position: "absolute",
    zIndex: 100,
    top: 40,
    right: 8,
  },

  buttonContainer: {
    width: "80%",
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 300,
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
    bottom: 0,
  },
});
