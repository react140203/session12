import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../api";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

function getLatLng(location: string) {
  const parts = location.replace("POINT(", "").replace(")", "").split(" ");
  return {
    latitude: +parts[0],
    longitude: +parts[1],
  };
}

export default function DrugStoreScreen() {
  const [DrugStores, setDrugStores] = useState<any[]>([]);
  const [location, setLocation] = useState<any>({
    latitude: 35.717633,
    longitude: 51.41058,
  });

  useEffect(() => {
    (async () => {
      // const { data, error } = await supabase
      //   .from("DrugStore")
      //   .select("*")
      //   .not("latitude", "is", null)
      //   .not("longitude", "is", null)
      //   .limit(10);

      const { data, error } = await supabase
        .rpc("nearby_drugstores", {
          long: location.latitude,
          lat: location.longitude,
        })
        .limit(20);

      setDrugStores(data);
      console.log("--->", getLatLng(data[0].location));
    })();
  }, [location]);

  async function openInGoogle(location: {
    latitude: number;
    longitude: number;
  }) {
    //google
    //a herf -> https://www.google.com -> scheme
    //google map-> google.navigation:q=35.717633,51.41058
    //

    //mail -> mailto:shdguf@usdhyf.com

    const neshan = await Linking.canOpenURL(
      `neshan:q=${location.latitude},${location.longitude}`
    );
    console.log(neshan);

    // Linking.openURL(
    //   `google.navigation:q=${location.latitude},${location.longitude}`
    // );

    // Linking.openURL(
    //   `neshan:q=${location.latitude},${location.longitude}`
    // );
  }

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       return;
  //     }

  //     try {
  //       console.log("....");
  //       let location = await Location.getCurrentPositionAsync();
  //       console.log("--->", location);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     // setLocation(location);
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {DrugStores &&
          DrugStores.map((x) => (
            <Marker
              key={x.id}
              coordinate={{
                latitude: getLatLng(x.location).latitude,
                longitude: getLatLng(x.location).longitude,
              }}
              onPress={() => openInGoogle(getLatLng(x.location))}
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
