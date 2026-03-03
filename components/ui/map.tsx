import { Text } from "@/components/ui/text";
import { AppleMaps, Coordinates, GoogleMaps } from "expo-maps";
import { Platform, StyleSheet } from "react-native";

function Map({
  coordinates,
  locationGranted = false,
}: {
  coordinates: Coordinates;
  locationGranted?: boolean;
}) {
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
        key={locationGranted ? "granted" : "pending"}
        style={styles.map}
        markers={[{ coordinates }]}
        properties={{ isMyLocationEnabled: locationGranted }}
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
