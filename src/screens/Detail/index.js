import React from "react";
import { View, Text } from "react-native";

export default function Detail({ nav }) {
  const { data } = nav.params;
  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
