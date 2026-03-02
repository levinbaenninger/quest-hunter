import { Text } from "@/components/ui/text";
import type { Doc } from "@/convex/_generated/dataModel";
import { capitalize } from "@/lib/utils";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

type QuestItemProps = {
  quest: Doc<"quests">;
};

export const QuestItem = ({ quest }: QuestItemProps) => {
  return (
    <Link href={`/quest/${quest._id}`} asChild>
      <Pressable>
        <View
          className="bg-muted flex-row items-center gap-3 rounded-xl p-4 shadow-sm shadow-black/5"
          style={{ borderCurve: "continuous" }}
        >
          <View className="flex-1 gap-1">
            <Text className="font-semibold">{quest.name}</Text>
            <Text className="text-muted-foreground text-sm">
              {quest.estimatedTime} min · {capitalize(quest.category)} ·{" "}
              {quest.xp} XP
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
