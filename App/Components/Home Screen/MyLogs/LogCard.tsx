import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../config/colors";
import MyLogsEndButtons from "./MyLogsEndButtons";

type LogCardProps = {
  log: any;
  index: number;
  refresh?: boolean;
  setRefresh?: (e: boolean) => void;
};

export const timestampToString = (timestamp: any) => {
  if (!timestamp) return;
  let date = timestamp.toDate().toDateString();
  date = date.split(" ");
  date[0] = date[0].split("");
  date[0].push(",");
  date[0] = date[0].join("");
  date[1] = date[1].split("");
  date[1].push(".");
  date[1] = date[1].join("");
  date[2] = date[2].split("");
  date[2].push(",");
  date[2] = date[2].join("");
  date = date.join(" ");
  let time = timestamp.toDate().toLocaleTimeString("en-US");
  time = time.split(" ");
  time[0] = time[0].substr(0, time[0].length - 3);
  time = time.join(" ");
  return `${date} at ${time}`;
};

const LogCard = ({ log, index, refresh, setRefresh }: LogCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textCategory}>Date:</Text>
        <Text style={styles.textContent}>{timestampToString(log.time)}</Text>
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
      <MyLogsEndButtons
        index={index}
        refresh={refresh}
        setRefresh={setRefresh}
        log={log}
      />
    </View>
  );
};

export default LogCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "80%",
    padding: 15,
    backgroundColor: colors.second,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 15,
    marginTop: 15,
  },
  textCategory: {
    fontSize: 25,
    color: colors.first,
    marginTop: 5,
  },
  textContent: {
    fontSize: 20,
    color: colors.first,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  attributeContainer: {
    borderBottomColor: colors.first,
    borderBottomWidth: 1,
  },
});
