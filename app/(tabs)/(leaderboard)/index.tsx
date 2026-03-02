import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { View } from "react-native";

const getMedalStyle = (rank: number) => {
  if (rank === 1)
    return { border: "border-yellow-400", text: "text-yellow-500" };
  if (rank === 2) return { border: "border-gray-400", text: "text-gray-400" };
  if (rank === 3) return { border: "border-amber-600", text: "text-amber-600" };
  return {
    border: "border-muted-foreground/30",
    text: "text-muted-foreground",
  };
};

const LeaderboardScreen = () => {
  const entries = useQuery(api.leaderboard.list);

  return (
    <Screen>
      <View className="gap-2">
        {entries?.map((entry, index) => {
          const rank = index + 1;
          const name = [entry.firstName, entry.lastName]
            .filter(Boolean)
            .join(" ");
          const medal = getMedalStyle(rank);
          return (
            <View
              key={entry._id}
              className="bg-card border-border flex-row items-center gap-4 rounded-xl border px-4 py-3"
            >
              {rank <= 3 ? (
                <View
                  className={`h-9 w-9 items-center justify-center rounded-full border-2 ${medal.border}`}
                >
                  <Text className={`text-sm font-bold ${medal.text}`}>
                    {rank}
                  </Text>
                </View>
              ) : (
                <View className="h-9 w-9 items-center justify-center">
                  <Text className="text-muted-foreground text-sm font-bold">
                    {rank}
                  </Text>
                </View>
              )}
              <Text className="flex-1 font-medium">{name}</Text>
              <Text className="text-muted-foreground font-semibold">
                {new Intl.NumberFormat("de-CH", { style: "decimal" }).format(
                  entry.xp,
                )}{" "}
                XP
              </Text>
            </View>
          );
        })}
      </View>
    </Screen>
  );
};

export default LeaderboardScreen;
