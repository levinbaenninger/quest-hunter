import Screen from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { View } from "react-native";

const QuestsScreen = () => {
  const quests = useQuery(api.quests.list);

  return (
    <Screen>
      <View className="gap-3">
        {quests?.map((quest) => (
          <Text key={quest._id}>{quest.title}</Text>
        ))}
      </View>
    </Screen>
  );
};

export default QuestsScreen;
