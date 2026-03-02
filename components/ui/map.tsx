import { Text } from "@/components/ui/text";
import { AppleMaps, Coordinates, GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, StyleSheet } from "react-native";

function Map({ coordinates }: { coordinates: Coordinates }) {
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((result) =>
      setLocationGranted(result === PermissionsAndroid.RESULTS.GRANTED),
    );
  }, []);

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={styles.map}
        markers={[{ coordinates }]}
        cameraPosition={{ coordinates, zoom: 17 }}
        properties={{ isMyLocationEnabled: true }}
      />
    );
  }

  if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={styles.map}
        markers={[{ coordinates }]}
        cameraPosition={{ coordinates, zoom: 15 }}
      />
    );
  }

  return <Text>This action is not supported on this platform.</Text>;
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 220,
  },
});

export { Map };
