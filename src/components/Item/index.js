import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function Item({
  title,
  URL,
  created_at,
  author,
  navigation,
  data,
}) {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => navigation.navigate("Detail", { data })}
    >
      <Card style={{ borderBottomColor: "#eee", borderBottomWidth: 2 }}>
        <Card.Title title={author ? author : " "} />
        <Card.Content>
          <Title>{title ? title : " "}</Title>
          <Paragraph>
            {created_at
              ? moment(created_at).format("YYYY-MM-DD hh:mm:A")
              : "N/A"}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>{URL ? URL : " "}</Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}
