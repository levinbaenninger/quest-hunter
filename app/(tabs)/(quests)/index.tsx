import { QuestItem } from "@/components/quests/quest-item";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ErrorBoundaryProps } from "expo-router";
import { FlatList, View } from "react-native";

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <ErrorState description={error.message} onRetry={retry} />
);

const QuestsScreen = () => {
  const quests = useQuery(api.quests.listRecommended);

  if (quests === undefined) {
    return <LoadingState />;
  }

  if (quests.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <EmptyState
          title="All quests completed"
          description="You've finished everything. Check back soon!"
        />
      </View>
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
