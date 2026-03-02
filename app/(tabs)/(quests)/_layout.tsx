import { Stack } from "expo-router";

const QuestsStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Quests", headerLargeTitle: true }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          headerLargeTitle: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="[id]/location/[locationId]"
        options={{ headerLargeTitle: true }}
      />
    </Stack>
  );
};

export default QuestsStack;
