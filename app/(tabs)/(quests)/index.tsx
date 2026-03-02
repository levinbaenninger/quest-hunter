import { QuestItem } from "@/components/quests/quest-item";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Screen } from "@/components/ui/screen";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ErrorBoundaryProps } from "expo-router";
import { FlatList } from "react-native";

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <ErrorState description={error.message} onRetry={retry} />
);

const QuestsScreen = () => {
  const quests = useQuery(api.quests.listRecommended);

  if (quests === undefined) {
    return (
      <Screen centered>
        <LoadingState />
      </Screen>
    );
  }

  if (quests.length === 0) {
    return (
      <Screen centered>
        <EmptyState
          title="Alle Quests abgeschlossen"
          description="Du hast alles abgeschlossen. Schau später noch einmal vorbei!"
        />
      </Screen>
    );
  }

  return (
    <FlatList
      className="flex-1"
      data={quests}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="p-4 gap-2"
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <QuestItem quest={item} />}
    />
  );
};

export default QuestsScreen;
