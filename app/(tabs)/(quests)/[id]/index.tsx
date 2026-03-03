import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useHideTabBar } from "@/hooks/use-hide-tab-bar";
import { capitalize } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import {
  type ErrorBoundaryProps,
  router,
  Stack,
  useLocalSearchParams,
} from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <ErrorState description={error.message} onRetry={retry} />
);

const QuestDetail = () => {
  useHideTabBar();

  const { id } = useLocalSearchParams<{ id: string }>();
  const quest = useQuery(api.quests.get, { questId: id as Id<"quests"> });
  const locations = useQuery(api.locations.listByQuest, {
    questId: id as Id<"quests">,
  });
  const status = useQuery(api.quests.getStatus, {
    questId: id as Id<"quests">,
  });
  const completedLocations = useQuery(api.locations.listCompleted, {
    questId: id as Id<"quests">,
  });

  const startQuest = useMutation(api.quests.start);
  const [isStarting, setIsStarting] = useState(false);

  if (
    quest === undefined ||
    locations === undefined ||
    status === undefined ||
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

  if (locations.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: quest.name }} />
        <ErrorState
          title="Keine Stationen"
          description="Diese Quest hat keine Stationen."
        />
      </>
    );
  }

  const firstLocationId = locations[0]._id;
  const isInProgress = !!status?.startedAt && !status.completedAt;

  const resumeLocationId = (() => {
    if (!isInProgress) return firstLocationId;
    const completedIds = new Set(completedLocations.map((cl) => cl.locationId));
    return (locations.find((l) => !completedIds.has(l._id)) ?? locations[0])
      ._id;
  })();

  const handleStartQuest = async () => {
    setIsStarting(true);
    try {
      await startQuest({ questId: id as Id<"quests"> });
      router.navigate(`/${id}/location/${firstLocationId}`);
    } catch {
      Alert.alert(
        "Fehler",
        "Quest konnte nicht gestartet werden. Bitte versuche es erneut.",
      );
    } finally {
      setIsStarting(false);
    }
  };

  const handleContinueQuest = () => {
    router.navigate(`/${id}/location/${resumeLocationId}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: quest.name }} />
      <Screen>
        <View className="gap-3">
          {quest.imageUrl ? (
            <Image
              source={quest.imageUrl}
              style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 16 }}
              contentFit="cover"
            />
          ) : null}
          <Text className="text-muted-foreground text-sm">
            {[
              `${quest.estimatedTime} min`,
              capitalize(quest.category),
              capitalize(quest.difficulty),
              `${quest.xp} XP`,
            ].join(" · ")}
          </Text>
          <Text>{quest.description}</Text>
        </View>
      </Screen>

      <View className="border-border bg-background border-t p-4 pb-8">
        {isInProgress ? (
          <Button size="lg" className="w-full" onPress={handleContinueQuest}>
            <Text>Quest fortsetzen</Text>
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full"
            onPress={handleStartQuest}
            disabled={isStarting}
          >
            <Text>{isStarting ? "Wird gestartet…" : "Quest starten"}</Text>
          </Button>
        )}
      </View>
    </>
  );
};

export default QuestDetail;
