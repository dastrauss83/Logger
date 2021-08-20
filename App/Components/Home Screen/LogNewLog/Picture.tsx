import React, { useState } from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import MyButton from "../../Atoms/MyButton";
import colors from "../../../config/colors";
import CameraModal from "./CameraModal";
import Icon from "react-native-vector-icons/Entypo";

type PictureProps = {
  picture: any;
  setPicture: any;
};

const Picture = ({ picture, setPicture }: PictureProps) => {
  const [cameraModal, setCameraModal] = useState<boolean>(false);
  const [pictureTaken, setPictureTaken] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {pictureTaken ? (
        <>
          <ImageBackground source={{ uri: picture }} style={styles.picture} />
          <MyButton
            containerColor={colors.second}
            textColor={colors.first}
            text={"Retake"}
            onPress={() => setCameraModal(true)}
            icon={
              <Icon
                name="camera"
                size={25}
                color={colors.first}
                style={{ marginRight: 10 }}
              />
            }
          />
        </>
      ) : (
        <MyButton
          containerColor={colors.second}
          textColor={colors.first}
          text={"Take a Picture!"}
          onPress={() => setCameraModal(true)}
          icon={
            <Icon
              name="camera"
              size={25}
              color={colors.first}
              style={{ marginRight: 10 }}
            />
          }
        />
      )}
      <CameraModal
        cameraModal={cameraModal}
        setCameraModal={setCameraModal}
        setPictureTaken={setPictureTaken}
        setPicture={setPicture}
      />
    </View>
  );
};

export default Picture;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    width: 300,
    height: 300,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
  },
});
