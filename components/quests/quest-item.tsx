import { Text } from "@/components/ui/text";
import type { Doc } from "@/convex/_generated/dataModel";
import { THEME } from "@/lib/theme";
import { capitalize } from "@/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

type QuestItemProps = {
  quest: Doc<"quests">;
  disabled?: boolean;
};

export const QuestItem = ({ quest, disabled = false }: QuestItemProps) => {
  const content = (
    <View
      className="bg-white flex-row items-center gap-3 rounded-xl p-4 shadow-sm shadow-black/5"
      style={{ opacity: disabled ? 0.75 : 1 }}
    >
      <View className="flex-1 gap-0.5">
        <Text className="font-semibold">{quest.name}</Text>
        <Text className="text-muted-foreground text-sm">
          {[
            `${quest.estimatedTime} min`,
            capitalize(quest.category),
            `${quest.xp} XP`,
          ].join(" · ")}
        </Text>
      </View>
      <Ionicons
        name={disabled ? "checkmark-circle" : "chevron-forward"}
        size={24}
        color={THEME.mutedForeground}
      />
    </View>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link href={`/${quest._id}`} asChild>
      <Pressable>{content}</Pressable>
    </Link>
  );
};
