import { QuestItem } from "@/components/quests/quest-item";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
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
    return <LoadingState />;
  }

  return (
    <FlatList
      data={quests}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="p-4 gap-2 grow"
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <QuestItem quest={item} />}
      ListEmptyComponent={
        <EmptyState
          title="All quests completed"
          description="You've finished everything. Check back soon!"
        />
      }
    />
  );
};

export default QuestsScreen;
