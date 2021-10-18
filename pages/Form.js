import React from "react";
import { Text, View, Button } from "react-native";

export default function Form({ navigation }) {
  return (
    <View>
      <Text>Form</Text>
      <Button title="목록으로" onPress={() => navigation.goBack()} />
    </View>
  );
}
