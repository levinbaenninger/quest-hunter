import { CancelQuestDialog } from "@/components/location/cancel-quest-dialog";
import { CompleteQuestDialog } from "@/components/location/complete-quest-dialog";
import { LocationActionBar } from "@/components/location/location-action-bar";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Map } from "@/components/ui/map";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useHideTabBar } from "@/hooks/use-hide-tab-bar";
import { useProximity } from "@/hooks/use-proximity";
import { THEME } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import {
  type ErrorBoundaryProps,
  Stack,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Pressable, View } from "react-native";

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <ErrorState description={error.message} onRetry={retry} />
);

type LocationContentProps = {
  questId: string;
  locationId: string;
  location: {
    name: string;
    description: string;
    coordinates: { latitude: number; longitude: number };
    order: number;
  };
  allLocations: { _id: Id<"locations">; order: number }[];
  completedLocations: { locationId: string }[];
};

const LocationContent = ({
  questId,
  locationId,
  location,
  allLocations,
  completedLocations,
}: LocationContentProps) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  const { isNearby, locationGranted } = useProximity(location.coordinates);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setCancelDialogOpen(true);
        return true;
      },
    );

    return () => subscription.remove();
  }, []);

  const isCompleted = completedLocations.some(
    (cl) => cl.locationId === locationId,
  );
  const nextLocation = allLocations.find((l) => l.order === location.order + 1);

  return (
    <>
      <Stack.Screen
        options={{
          title: location.name,
          headerRight: () => (
            <Pressable
              onPress={() => setCancelDialogOpen(true)}
              className="pl-1.5"
            >
              <Ionicons name="close" size={24} color={THEME.destructive} />
            </Pressable>
          ),
        }}
      />

      <View className="flex-1">
        <Screen className="gap-2">
          <Map
            coordinates={location.coordinates}
            locationGranted={locationGranted}
          />
          <Text>{location.description}</Text>
        </Screen>

        <LocationActionBar
          questId={questId}
          locationId={locationId}
          isCompleted={isCompleted}
          isNearby={isNearby}
          nextLocationId={nextLocation?._id}
          onCompleteRequest={() => setCompleteDialogOpen(true)}
        />
      </View>

      <CompleteQuestDialog
        open={completeDialogOpen}
        onOpenChange={setCompleteDialogOpen}
        questId={questId}
      />

      <CancelQuestDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
      />
    </>
  );
};

const LocationScreen = () => {
  useHideTabBar();

  const { id: questId, locationId } = useLocalSearchParams<{
    id: string;
    locationId: string;
  }>();

  const location = useQuery(api.locations.get, {
    locationId: locationId as Id<"locations">,
  });
  const allLocations = useQuery(api.locations.listByQuest, {
    questId: questId as Id<"quests">,
  });
  const completedLocations = useQuery(api.locations.listCompleted, {
    questId: questId as Id<"quests">,
  });

  if (
    location === undefined ||
    allLocations === undefined ||
    completedLocations === undefined
  ) {
    return (
      <>
        <Stack.Screen options={{ title: "" }} />
        <Screen centered>
          <LoadingState />
        </Screen>
      </>
    );
  }

  return (
    <LocationContent
      questId={questId}
      locationId={locationId}
      location={location}
      allLocations={allLocations}
      completedLocations={completedLocations}
    />
  );
};

export default LocationScreen;
