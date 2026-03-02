import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { capitalize } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import {
  type ErrorBoundaryProps,
  Stack,
  useLocalSearchParams,
} from "expo-router";
import { View } from "react-native";

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <ErrorState description={error.message} onRetry={retry} />
);

const QuestDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quest = useQuery(api.quests.get, { questId: id as Id<"quests"> });

  if (quest === undefined) {
    return (
      <>
        <Stack.Screen options={{ title: "Quest" }} />

        <Screen centered>
          <LoadingState />
        </Screen>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: quest.name }} />
      <Screen>
        <View className="gap-3">
          {quest.imageUrl && (
            <Image
              source={quest.imageUrl}
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                borderRadius: 16,
              }}
              contentFit="cover"
            />
          )}
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
        <Button size="lg" className="w-full" onPress={() => {}}>
          <Text>Quest starten</Text>
        </Button>
      </View>
    </>
  );
};

export default QuestDetail;
