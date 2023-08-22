import { View, Text, Button } from "react-native";
import React from "react";

export default function DrugListScreen({ navigation }: any) {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>DrugList</Text>
      <Button title="Back" onPress={goBack}></Button>
    </View>
  );
}
