import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";

const LocationScreen = () => {
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

  const isCompleted = completedLocations?.some(
    (cl) => cl.locationId === locationId,
  );
  const nextLocation = allLocations?.find(
    (l) => l.order === (location?.order ?? -1) + 1,
  );

  const handleNext = () => {
    if (nextLocation) {
      router.replace(`/quest/${questId}/location/${nextLocation._id}`);
    } else {
      setCompleteDialogOpen(true);
    }
  };

  const cancelQuest = useMutation(api.quests.cancel);
  const completeQuest = useMutation(api.quests.complete);
  const generateUploadUrl = useMutation(api.locations.generateUploadUrl);
  const completeLocation = useMutation(api.locations.complete);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  const handleCompleteQuest = async (goToLeaderboard: boolean) => {
    await completeQuest({ questId: questId as Id<"quests"> });
    if (goToLeaderboard) {
      router.replace("/(tabs)/(leaderboard)");
    } else {
      router.dismissAll();
    }
  };

  const handleCancelQuest = async () => {
    await cancelQuest({ questId: questId as Id<"quests"> });
    router.dismissAll();
  };

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled || !result.assets[0]) return;

    const uploadUrl = await generateUploadUrl();

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": result.assets[0].mimeType ?? "image/jpeg" },
      body: await fetch(result.assets[0].uri).then((r) => r.blob()),
    });

    const { storageId } = await response.json();

    await completeLocation({
      questId: questId as Id<"quests">,
      locationId: locationId as Id<"locations">,
      photoStorageId: storageId,
    });
  };

  if (!location) {
    return (
      <Screen>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: location.name,
          headerBackVisible: false,
          headerRight: () => (
            <Pressable onPress={() => setCancelDialogOpen(true)}>
              <Ionicons name="close" size={24} />
            </Pressable>
          ),
        }}
      />
      <View className="flex-1">
        <Screen>
          <View className="gap-3">
            {/* <Map coordinates={location.coordinates} /> */}
            <Text>{location.description}</Text>
          </View>
        </Screen>

        <View className="border-border bg-background border-t p-4 pb-8">
          {isCompleted ? (
            <Button size="lg" className="w-full" onPress={handleNext}>
              <Text>{nextLocation ? "Weiter" : "Quest abschliessen"}</Text>
            </Button>
          ) : (
            <Button size="lg" className="w-full" onPress={handleOpenCamera}>
              <Text>Foto aufnehmen</Text>
            </Button>
          )}
        </View>
      </View>

      <AlertDialog
        open={completeDialogOpen}
        onOpenChange={setCompleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quest abgeschlossen! 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Du hast diese Quest erfolgreich abgeschlossen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onPress={() => handleCompleteQuest(false)}>
              <Text>OK</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={() => handleCompleteQuest(true)}>
              <Text>Zum Leaderboard</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quest abbrechen?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchtest du die Quest wirklich abbrechen? Dein Fortschritt geht
              verloren.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Abbrechen</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={handleCancelQuest}>
              <Text>Quest beenden</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LocationScreen;
