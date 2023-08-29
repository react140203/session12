import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../api";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function DrugStoreScreen() {
  const [DrugStores, setDrugStores] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("DrugStore")
        .select("*")
        .not("latitude", "is", null)
        .not("longitude", "is", null)
        .limit(10);

      setDrugStores(data);
      // console.log(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      try {
        console.log("....");
        let location = await Location.getCurrentPositionAsync();
        console.log("--->", location);
      } catch (e) {
        console.log(e);
      }
      // setLocation(location);
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
