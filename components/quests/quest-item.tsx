import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, View } from "react-native";

type Quest = {
  _id: string;
  name: string;
  estimatedTime: number;
  difficulty: "easy" | "medium" | "hard";
  xp: number;
};

type QuestItemProps = {
  quest: Quest;
};

export const QuestItem = ({ quest }: QuestItemProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Link href={`/(quests)/${quest._id}`} asChild>
      <Pressable>
        <View
          className="bg-muted flex-row items-center gap-3 rounded-xl p-4 shadow-sm shadow-black/5"
          style={{ borderCurve: "continuous" }}
        >
          <View className="flex-1 gap-1">
            <Text className="font-semibold">{quest.name}</Text>
            <Text className="text-muted-foreground text-sm">
              {quest.estimatedTime} min ·{" "}
              {quest.difficulty.charAt(0).toUpperCase() +
                quest.difficulty.slice(1)}{" "}
              · {quest.xp} XP
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
