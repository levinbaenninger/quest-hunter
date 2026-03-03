import { EntryRow } from "@/components/leaderboard/entry-row";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ScrollView, View } from "react-native";

const LeaderboardScreen = () => {
  const entries = useQuery(api.leaderboard.list);

  if (!entries) return null;

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const currentUserRank = entries.findIndex((e) => e.isCurrentUser) + 1;
  const currentUserInTop3 = currentUserRank >= 1 && currentUserRank <= 3;

  if (currentUserInTop3) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="gap-2 p-4">
          {entries.map((entry, index) => (
            <EntryRow
              key={entry._id}
              entry={entry}
              rank={index + 1}
              highlight={entry.isCurrentUser}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className="flex-1">
      <View className="gap-2 px-4 pt-4">
        {top3.map((entry, index) => (
          <EntryRow key={entry._id} entry={entry} rank={index + 1} />
        ))}
      </View>
      <Separator className="my-3" />
      <ScrollView>
        <View className="gap-2 px-4 pb-4">
          {rest.map((entry, index) => (
            <EntryRow
              key={entry._id}
              entry={entry}
              rank={index + 4}
              highlight={entry.isCurrentUser}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LeaderboardScreen;
