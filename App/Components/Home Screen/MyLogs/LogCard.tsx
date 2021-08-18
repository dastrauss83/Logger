import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../config/colors";

type LogCardProps = {
  log: any;
};

const LogCard = ({ log }: LogCardProps) => {
  const timestampToString = (timestamp: any) => {
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
    console.log(time);

    return `${date} at ${time}`;
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.textCategory}>Date:</Text>
      <Text style={styles.textContent}>{timestampToString(log.time)}</Text>
      <Text style={styles.textCategory}>Duration:</Text>
      <Text style={styles.textContent}>
        {log.minutes} Minutes and {log.seconds} Seconds
      </Text>
    </View>
  );
};

export default LogCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
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
  textCategory: { fontSize: 25, color: colors.first, marginBottom: 5 },
  textContent: {
    fontSize: 20,
    color: colors.first,
    textAlign: "center",
    marginBottom: 5,
  },
});
