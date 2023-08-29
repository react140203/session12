import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../api";

export default function DrugDetailScreen({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);
  const [drug, setDrug] = useState<any>();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from("Drug")
        .select("*")
        .eq("id", route.params.id);
      console.log(data);
      setDrug(data[0]);
      setLoading(false);
    })();
  }, [route.params.id]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>DrugList</Text>

        {drug && (
          <>
            <Text>{drug.drugFamilyFaTitle}</Text>
            {/* <Text>{drug.appearanceAttachmentsIds}</Text> */}
            {/* http://irc.fda.gov.ir/AttachmentApi/LoadAttachment?id=*/}
            {drug.appearanceAttachmentsIds.split(",").map((id: string) => (
              <Image
                key={id}
                style={styles.image}
                source={{
                  uri: `http://irc.fda.gov.ir/AttachmentApi/LoadAttachment?id=${id}`,
                }}
              />
            ))}
          </>
        )}

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
  image: { width: 256, height: 256 },
});
