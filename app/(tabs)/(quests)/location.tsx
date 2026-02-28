import { Map } from "@/components/ui/map";
import Screen from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

// Test this
const LocationScreen = () => {
  const id = useLocalSearchParams<{ id: string }>().id;
  const location = useQuery(api.locations.get, {
    locationId: id as Id<"locations">,
  });

  if (!location) {
    return (
      <Screen>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="gap-3">
        <Text className="text-2xl font-bold">{location.name}</Text>
        <Map coordinates={location.coordinates} />
        <Text>{location?.description}</Text>
      </View>
    </Screen>
  );
};

export default LocationScreen;
