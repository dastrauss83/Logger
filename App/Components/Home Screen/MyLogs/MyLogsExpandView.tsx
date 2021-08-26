import React from "react";
import { StyleSheet, Modal, View, Text, ScrollView, Image } from "react-native";
import MyButton from "../../Atoms/MyButton";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../../config/colors";
import { timestampToString } from "./LogCard";
import MapView, { Marker } from "react-native-maps";

type MyLogsExpandViewProps = {
  showLog: boolean;
  setShowLog: (e: boolean) => void;
  log: any;
};

const MyLogsExpandView = ({
  showLog,
  setShowLog,
  log,
}: MyLogsExpandViewProps) => {
  return (
    <Modal animationType="fade" visible={showLog} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
            <View style={styles.attributeContainer}>
              <Text style={styles.textCategory}>Date:</Text>
              <Text style={styles.textContent}>
                {timestampToString(log.time)}
              </Text>
            </View>
            <View style={styles.attributeContainer}>
              <Text style={styles.textCategory}>Duration:</Text>
              <Text style={styles.textContent}>
                {log.minutes} Minutes and {log.seconds} Seconds
              </Text>
            </View>
            <View style={styles.attributeContainer}>
              <Text style={styles.textCategory}>$ Earned:</Text>
              <Text style={styles.textContent}>${log.earned}</Text>
            </View>
            {log.picture !== "" && (
              <View
                style={[
                  styles.attributeContainer,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Image
                  source={{ uri: `${log.picture}` }}
                  style={styles.image}
                />
              </View>
            )}
            {log.location !== "" && (
              <View
                style={[
                  styles.attributeContainer,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <MapView
                  initialRegion={{
                    latitude: log.location?.latitude,
                    longitude: log.location?.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  style={styles.map}
                >
                  <Marker coordinate={log.location} />
                </MapView>
              </View>
            )}
            <MyButton
              onPress={() => {
                setShowLog(false);
              }}
              containerColor={colors.third}
              textColor={colors.first}
              text={"Close"}
              icon={
                <Icon
                  name="back"
                  size={25}
                  color={colors.first}
                  style={{ position: "absolute", left: 20, top: 23 }}
                />
              }
              style={{ marginBottom: 0, width: "88%" }}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MyLogsExpandView;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modalView: {
    padding: 15,
    height: "85%",
    width: "91%",
    backgroundColor: colors.first,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textCategory: {
    fontSize: 25,
    color: colors.second,
    marginTop: 5,
  },
  textContent: {
    fontSize: 20,
    color: colors.second,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  attributeContainer: {
    borderBottomColor: colors.second,
    borderBottomWidth: 1,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 15,
    marginBottom: 15,
  },
  map: {
    width: 300,
    height: 300,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
  },
});
