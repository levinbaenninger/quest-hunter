import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Stack } from "expo-router";
import { View } from "react-native";

const Index = () => {
  const quests = useQuery(api.quests.list);

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Home" }} />
      <View className="flex-1 items-center justify-center">
        <Button onPress={() => alert("Hello User!")} variant="outline">
          <Text>Click me</Text>
        </Button>
        <Text>{quests?.map((quest) => quest.title).join(", ")}</Text>
      </View>
    </>
  );
};

export default Index;
