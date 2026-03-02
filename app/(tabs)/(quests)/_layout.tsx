import { Stack } from "expo-router";

const QuestsStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Quests", headerLargeTitle: true }}
      />
    </Stack>
  );
};

export default QuestsStack;
