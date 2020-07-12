import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Detail({ route }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
