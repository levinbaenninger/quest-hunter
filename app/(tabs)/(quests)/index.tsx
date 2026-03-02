import { QuestItem } from "@/components/quests/quest-item";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Screen } from "@/components/ui/screen";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "convex/react";
import { ErrorBoundaryProps } from "expo-router";
import { useState } from "react";
import { FlatList, Platform, View } from "react-native";

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => (
  <ErrorState description={error.message} onRetry={retry} />
);

type Tab = "recommended" | "new" | "done";

const emptyMessages: Record<Tab, { title: string; description: string }> = {
  recommended: {
    title: "Alle Quests abgeschlossen",
    description:
      "Du hast alles abgeschlossen. Schau später noch einmal vorbei!",
  },
  new: {
    title: "Keine neuen Quests",
    description:
      "Momentan gibt es keine neuen Quests. Schau bald wieder vorbei!",
  },
  done: {
    title: "Noch nichts abgeschlossen",
    description:
      "Starte eine Quest und schliesse sie ab, um sie hier zu sehen.",
  },
};

const QuestsScreen = () => {
  const [tab, setTab] = useState<Tab>("recommended");
  const headerHeight = useHeaderHeight();

  const recommendedQuests = useQuery(api.quests.listRecommended);
  const newQuests = useQuery(api.quests.listNew);
  const finishedQuests = useQuery(api.quests.listFinished);
  const inProgressIds = useQuery(api.quests.listInProgress);

  const quests =
    tab === "recommended"
      ? recommendedQuests
      : tab === "new"
        ? newQuests
        : finishedQuests;

  return (
    <>
      <View style={{ paddingTop: Platform.OS === "ios" ? headerHeight : 16 }}>
        <Tabs
          className="px-4"
          value={tab}
          onValueChange={(v) => setTab(v as Tab)}
        >
          <TabsList>
            <TabsTrigger value="recommended" className="flex-1">
              <Text>Empfohlen</Text>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex-1">
              <Text>Neu</Text>
            </TabsTrigger>
            <TabsTrigger value="done" className="flex-1">
              <Text>Fertig</Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </View>

      {quests === undefined ? (
        <Screen centered>
          <LoadingState />
        </Screen>
      ) : quests.length === 0 ? (
        <Screen centered>
          <EmptyState
            title={emptyMessages[tab].title}
            description={emptyMessages[tab].description}
          />
        </Screen>
      ) : (
        <FlatList
          className="flex-1"
          data={quests}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerClassName="p-4 gap-2"
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <QuestItem
              quest={item}
              disabled={tab === "done"}
              inProgress={inProgressIds?.includes(item._id) ?? false}
            />
          )}
        />
      )}
    </>
  );
};

export default QuestsScreen;
