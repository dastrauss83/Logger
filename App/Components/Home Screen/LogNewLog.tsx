import React from "react";
import { useState } from "react";
import { StyleSheet, Modal, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../../config/colors";
import MyButton from "../Atoms/MyButton";
import FinalButtons from "./LogNewLog/FinalButtons";
import PromptText from "./LogNewLog/PromptText";
import Rate from "./LogNewLog/Rate";
import Time from "./LogNewLog/Time";

type LogNewLogProp = {
  style?: any;
  setRefresh?: (e: boolean) => void;
  refresh?: boolean;
};

const LogNewLog = ({ setRefresh, refresh, style }: LogNewLogProp) => {
  const [showLog, setShowLog] = useState<boolean>(false);
  const [rate, setRate] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");

  return (
    <>
      <MyButton
        onPress={() => setShowLog(true)}
        containerColor={colors.second}
        textColor={colors.first}
        text={"Log New Log"}
        style={[style]}
        icon={
          <Icon
            name="pluscircleo"
            size={25}
            color={colors.first}
            style={{ marginRight: 10 }}
          />
        }
      />
      <Modal animationType="slide" visible={showLog} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
              <PromptText />
              <Time
                minutes={minutes}
                seconds={seconds}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
              />
              <Rate rate={rate} setRate={setRate} />
              <FinalButtons
                minutes={minutes}
                seconds={seconds}
                rate={rate}
                setMinutes={setMinutes}
                setSeconds={setSeconds}
                setShowLog={setShowLog}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LogNewLog;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  },
  modalView: {
    width: "90%",
    height: "75%",
    backgroundColor: colors.first,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: colors.second,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 50,
  },
  closeModal: {
    backgroundColor: colors.third,
    marginBottom: 0,
  },
});
