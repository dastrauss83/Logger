import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";

const LogNewLog = () => {
  const [showLog, setShowLog] = useState<boolean>(false);

  return (
    <TouchableOpacity style={styles.button} onPress={() => setShowLog(true)}>
      <Icon
        name="pluscircleo"
        size={25}
        color={colors.first}
        style={{ marginRight: 10 }}
      />

      <Text style={styles.buttonText}>Log New Log</Text>
      <Modal animationType="slide" visible={showLog} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView style={{ flex: 1, width: "100%" }}>
              <View style={styles.submitClose}>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.closeModal]}
                  onPress={() => setShowLog(false)}
                >
                  <Icon name="closecircleo" size={25} color={colors.first} />
                  <Text style={{ fontSize: 25, color: colors.first }}>
                    Close Menu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.submit]}
                  onPress={() => setShowLog(false)}
                >
                  <Icon name="upload" size={25} color={colors.first} />
                  <Text style={{ fontSize: 25, color: colors.first }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default LogNewLog;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 25,
    color: colors.first,
  },
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.third,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "45%",
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  },
  modalView: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "100%",
    height: "75%",
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
  submit: {
    backgroundColor: colors.second,
    marginBottom: 0,
  },
  submitClose: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});
