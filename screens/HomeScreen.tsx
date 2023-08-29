import { View, Text, Button } from "react-native";
import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
interface sample {
  title: "Mr" | "Ms" | "Dr";
}

export default function HomeScreen({ navigation }: Props) {
  //Curry
  const goto = (path: any) => {
    return () => navigation.push(path);
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Drug List" onPress={goto("DrugList")}></Button>
      <Button title="Drug Scan" onPress={goto("DrugScan")}></Button>
      <Button title="Drug Store" onPress={goto("DrugStore")}></Button>
    </View>
  );
}
