import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Entypo";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import colors from "../../../config/colors";
import MyButton from "../../Atoms/MyButton";
import * as Location from "expo-location";

type MapProps = {
  location: boolean;
  setLocation: (e: boolean) => void;
  coordinate: any;
  setCoordinate: (e: any) => void;
};

const Map = ({
  location,
  setLocation,
  coordinate,
  setCoordinate,
}: MapProps) => {
  const [region, setRegion] = useState<any>();

  const regionProps = {
    region: region,
    setRegion: setRegion,
  };

  const handleGetCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location: any = await Location.getLastKnownPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setCoordinate({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            initialRegion={{
              latitude: 40.78555,
              longitude: -73.962,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}
            {...regionProps}
            style={styles.map}
          >
            <Marker
              draggable
              coordinate={coordinate}
              onDragEnd={(e: any) => {
                setCoordinate(e.nativeEvent.coordinate);
                setRegion(null);
              }}
            />
          </MapView>
          <View style={styles.buttonsContainer}>
            <MyButton
              onPress={() => setLocation(false)}
              containerColor={colors.third}
              textColor={colors.first}
              text={"Clear"}
              style={{ width: "30%" }}
              icon={
                <IconMaterial
                  name="clear"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
            />
            <MyButton
              containerColor={colors.second}
              textColor={colors.first}
              text={"Current Location"}
              onPress={handleGetCoordinates}
              style={{ width: "60%" }}
              icon={
                <Icon
                  name="location-pin"
                  size={25}
                  color={colors.first}
                  style={{ marginRight: 10 }}
                />
              }
            />
          </View>
        </>
      ) : (
        <MyButton
          containerColor={colors.second}
          textColor={colors.first}
          text={"Set a Location"}
          onPress={() => setLocation(true)}
          icon={
            <Icon
              name="location-pin"
              size={25}
              color={colors.first}
              style={{ marginRight: 10 }}
            />
          }
        />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.second,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 300,
    height: 300,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
