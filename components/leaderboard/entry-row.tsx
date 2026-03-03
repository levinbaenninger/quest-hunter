import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { View } from "react-native";

const ITEM_HEIGHT = 68;

type Entry = NonNullable<
  ReturnType<typeof useQuery<typeof api.leaderboard.list>>
>[number];

const getMedalStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return { border: "border-yellow-400", text: "text-yellow-500" };
    case 2:
      return { border: "border-gray-400", text: "text-gray-400" };
    case 3:
      return { border: "border-amber-600", text: "text-amber-600" };
    default:
      return {
        border: "border-muted-foreground/30",
        text: "text-muted-foreground",
      };
  }
};

const EntryRow = ({
  entry,
  rank,
  highlight = false,
}: {
  entry: Entry;
  rank: number;
  highlight?: boolean;
}) => {
  const name = [entry.firstName, entry.lastName].filter(Boolean).join(" ");
  const medal = getMedalStyle(rank);
  return (
    <View
      className={cn(
        "bg-card flex-row items-center gap-4 rounded-xl px-4 py-3",
        highlight ? "border-2" : "border-border border",
      )}
      style={
        highlight
          ? { borderColor: THEME.primary, height: ITEM_HEIGHT }
          : { height: ITEM_HEIGHT }
      }
    >
      {rank <= 3 ? (
        <View
          className={`h-9 w-9 items-center justify-center rounded-full border-2 ${medal.border}`}
        >
          <Text className={`text-sm font-bold ${medal.text}`}>{rank}</Text>
        </View>
      ) : (
        <View className="h-9 w-9 items-center justify-center">
          <Text className="text-muted-foreground text-sm font-bold">
            {rank}
          </Text>
        </View>
      )}
      <Text
        className="flex-1 font-medium"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
      <Text className="text-muted-foreground font-semibold">
        {new Intl.NumberFormat("de-CH", { style: "decimal" }).format(entry.xp)}{" "}
        XP
      </Text>
    </View>
  );
};

export { EntryRow, ITEM_HEIGHT };
