import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../api";

export default function DrugListScreen({ navigation }: any) {
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [DrugList, setDrugList] = useState<any[]>([]);
  useEffect(() => {
    setRefreshing(true);
    (async () => {
      const { data, error } = await supabase
        .from("Drug")
        .select("*")
        .range(page * 10, (page + 1) * 10 - 1);
      if (page === 0) {
        setDrugList(data);
      } else {
        setDrugList([...DrugList, ...data]);
      }
      setRefreshing(false);
    })();
  }, [page]);

  const goBack = () => {
    navigation.goBack();
  };
  const loadNext = () => {
    console.log(page, page * 10, (page + 1) * 10);
    setPage(page + 1);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={DrugList}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate({
                  name: "DrugDetail",
                  params: { id: item.id },
                })
              }
            >
              <Text style={styles.item}>{item.drugGenericFaName}</Text>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => item.id.toString()}
          onEndReached={loadNext}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setPage(0)}
            ></RefreshControl>
          }
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
