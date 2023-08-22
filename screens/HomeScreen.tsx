import { View, Text, Button } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }: any) {
  const gotoDrugList = () => {
    navigation.push("DrugList");
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Drug List" onPress={gotoDrugList}></Button>
    </View>
  );
}
