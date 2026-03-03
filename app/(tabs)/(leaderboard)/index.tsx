import { EntryRow } from "@/components/leaderboard/entry-row";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Screen } from "@/components/ui/screen";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";

type ListItem = {
  entry: NonNullable<
    ReturnType<typeof useQuery<typeof api.leaderboard.list>>
  >[number];
  rank: number;
};

const ITEM_HEIGHT = 68;

const LeaderboardScreen = () => {
  const entries = useQuery(api.leaderboard.list);
  const flatListRef = useRef<FlatList>(null);

  const currentUserIndex = entries?.findIndex((e) => e.isCurrentUser) ?? -1;
  const currentUserRank = currentUserIndex + 1;
  const currentUserInTop3 = currentUserRank >= 1 && currentUserRank <= 3;

  useEffect(() => {
    if (currentUserInTop3 || currentUserIndex < 3) return;
    const dataIndex = currentUserIndex - 3;
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: dataIndex,
        animated: false,
        viewPosition: 0.5,
      });
    }, 100);
  }, [entries, currentUserIndex, currentUserInTop3]);

  if (entries === undefined)
    return (
      <Screen centered>
        <LoadingState />
      </Screen>
    );

  if (entries.length === 0)
    return (
      <Screen centered>
        <EmptyState
          title="Es sieht so aus, als ob noch niemand Quests abgeschlossen hat."
          description="Sobald Benutzer Quests abschließen, werden sie hier angezeigt."
        />
      </Screen>
    );

  if (currentUserInTop3) {
    return (
      <FlatList
        data={entries.map((entry, index) => ({ entry, rank: index + 1 }))}
        keyExtractor={({ entry }) => entry._id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-2 p-4"
        renderItem={({ item: { entry, rank } }) => (
          <EntryRow entry={entry} rank={rank} highlight={entry.isCurrentUser} />
        )}
      />
    );
  }

  const top3 = entries.slice(0, 3);
  const rest: ListItem[] = entries
    .slice(3)
    .map((entry, index) => ({ entry, rank: index + 4 }));

  return (
    <View className="flex-1">
      <View className="gap-2 px-4 pt-4">
        {top3.map((entry, index) => (
          <EntryRow key={entry._id} entry={entry} rank={index + 1} />
        ))}
      </View>
      <Separator className="my-3" />
      <FlatList
        ref={flatListRef}
        data={rest}
        keyExtractor={({ entry }) => entry._id}
        contentContainerClassName="gap-2 px-4 pb-4"
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: (ITEM_HEIGHT + 8) * index,
          index,
        })}
        onScrollToIndexFailed={({ averageItemLength, index }) => {
          flatListRef.current?.scrollToOffset({
            offset: averageItemLength * index,
            animated: false,
          });
        }}
        renderItem={({ item: { entry, rank } }) => (
          <EntryRow entry={entry} rank={rank} highlight={entry.isCurrentUser} />
        )}
      />
    </View>
  );
};

export default LeaderboardScreen;
