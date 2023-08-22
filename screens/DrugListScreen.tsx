import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../api";

export default function DrugListScreen({ navigation }: any) {
  const [DrugList, setDrugList] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("Drug").select("*").limit(10);
      setDrugList(data);
    })();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={DrugList}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.drugGenericFaName}</Text>
          )}
          keyExtractor={(item) => item.id}
        />

        <Text>DrugList</Text>
        <Button title="Back" onPress={goBack}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
