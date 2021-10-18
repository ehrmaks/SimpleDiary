import React from "react";
import { Text, View, Button } from "react-native";

export default function Detail({ navigation }) {
  return (
    <View>
      <Text>Detail</Text>
      <Button title="목록으로" onPress={() => navigation.goBack()} />
    </View>
  );
}
