import Screen from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";

const QuestDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Text>{id}</Text>
    </Screen>
  );
};

export default QuestDetail;
