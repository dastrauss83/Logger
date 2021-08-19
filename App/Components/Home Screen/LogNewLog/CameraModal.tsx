import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { Camera } from "expo-camera";
let camera: Camera;
import MyButton from "../../Atoms/MyButton";
import colors from "../../../config/colors";

type CameraModalProps = {
  cameraModal: boolean;
  setCameraModal: (e: boolean) => void;
  setPictureTaken: (e: boolean) => void;
  setPicture: any;
};

const CameraModal = ({
  cameraModal,
  setCameraModal,
  setPictureTaken,
  setPicture,
}: CameraModalProps) => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handlePic = async () => {
    const photo: any = await camera.takePictureAsync();
    console.log(photo);
    setPicture(photo.uri);
    setCameraModal(false);
    setPictureTaken(true);
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Modal animationType="fade" visible={cameraModal} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref: any) => {
              camera = ref;
            }}
          >
            <View style={styles.buttonContainer}>
              <MyButton
                onPress={() => setCameraModal(false)}
                containerColor={colors.third}
                textColor={colors.first}
                text={"Close"}
                style={{ width: 70 }}
              />
              <MyButton
                onPress={handlePic}
                containerColor={colors.second}
                textColor={colors.first}
                text={"Take"}
                style={{ width: 70 }}
              />
              <MyButton
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
                containerColor={colors.third}
                textColor={colors.first}
                text={"Flip"}
                style={{ width: 70 }}
              />
            </View>
          </Camera>
        </View>
      </View>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    height: "100%",
    width: "100%",
  },
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.second,
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
});
