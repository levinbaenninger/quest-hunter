import { Text } from "@/components/ui/text";
import { AppleMaps, Coordinates, GoogleMaps } from "expo-maps";
import { Platform } from "react-native";

function Map({ coordinates }: { coordinates: Coordinates }) {
  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={{ flex: 1 }}
        markers={[{ coordinates: coordinates }]}
        properties={{ isMyLocationEnabled: true }}
      />
    );
  }
  if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={{ flex: 1 }}
        markers={[{ coordinates: coordinates }]}
        properties={{ isMyLocationEnabled: true }}
        cameraPosition={{ coordinates: coordinates }}
      />
    );
  }
  return (
    <>
      <Text>This action is not supported on this platform.</Text>
    </>
  );
}

export { Map };
