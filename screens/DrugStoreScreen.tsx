import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../api";
import MapView, { Marker } from "react-native-maps";

export default function DrugStoreScreen() {
  const [DrugStores, setDrugStores] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("DrugStore")
        .select("*")
        .limit(10);
      setDrugStores(data);
      // console.log(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {DrugStores &&
          DrugStores.map((x) => (
            <Marker
              key={x.id}
              coordinate={{
                latitude: x.latitude,
                longitude: x.longitude,
              }}
              title={x.name}
            ></Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
