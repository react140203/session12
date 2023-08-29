import { View, Text, Button } from "react-native";
import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const gotoDrugList = () => {
    navigation.push("DrugList");
  };
  const gotoDrugStore = () => {
    navigation.push("DrugStore");
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Drug List" onPress={gotoDrugList}></Button>
      <Button title="Drug Store" onPress={gotoDrugStore}></Button>
    </View>
  );
}
