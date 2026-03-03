import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

type Props = {
  questId: string;
  locationId: string;
  isCompleted: boolean;
  isNearby: boolean;
  nextLocationId: string | undefined;
  onCompleteRequest: () => void;
};

export const LocationActionBar = ({
  questId,
  locationId,
  isCompleted,
  isNearby,
  nextLocationId,
  onCompleteRequest,
}: Props) => {
  const generateUploadUrl = useMutation(api.locations.generateUploadUrl);
  const completeLocation = useMutation(api.locations.complete);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleNext = () => {
    if (nextLocationId) {
      router.replace(`/${questId}/location/${nextLocationId}`);
    } else {
      onCompleteRequest();
    }
  };

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Kamera nicht verfügbar",
        "Bitte erlaube den Kamerazugriff in den Einstellungen.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled || !result.assets[0]) return;

    setIsCapturing(true);
    try {
      const uploadUrl = await generateUploadUrl();

      const blob = await fetch(result.assets[0].uri).then((r) => r.blob());
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": result.assets[0].mimeType ?? "image/jpeg" },
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`);
      }

      const { storageId } = await uploadResponse.json();

      await completeLocation({
        questId: questId as Id<"quests">,
        locationId: locationId as Id<"locations">,
        photoStorageId: storageId,
      });
    } catch {
      Alert.alert(
        "Fehler",
        "Foto konnte nicht hochgeladen werden. Bitte versuche es erneut.",
      );
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View className="border-border bg-background border-t p-4 pb-8">
      {isCompleted ? (
        <Button size="lg" className="w-full" onPress={handleNext}>
          <Text>{nextLocationId ? "Weiter" : "Quest abschliessen"}</Text>
        </Button>
      ) : (
        <Button
          size="lg"
          className="w-full"
          onPress={handleOpenCamera}
          disabled={isCapturing || !isNearby}
        >
          <Text>{isCapturing ? "Wird hochgeladen…" : "Foto aufnehmen"}</Text>
        </Button>
      )}
    </View>
  );
};
