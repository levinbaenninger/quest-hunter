import { AppleMaps, Coordinates } from "expo-maps";
import { Platform, Text } from "react-native";

function Map({ coordinates }: { coordinates: Coordinates }) {
  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={{ flex: 1 }}
        markers={[{ coordinates: coordinates }]}
        properties={{ isMyLocationEnabled: true }}
      />
    );
  } /*else if (Platform.OS === 'android') {
        return <GoogleMaps.View style={{ flex: 1 }} />;
    }*/ else {
    return <Text>Map is not supported on this platform.</Text>;
  }
}

export { Map };
