import Stack from "expo-router/stack";

const QuestsStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Quests", headerLargeTitle: true }}
      />
      <Stack.Screen
        name="[id]/location"
        options={{ title: "Location", headerLargeTitleEnabled: false }}
      />
    </Stack>
  );
};

export default QuestsStack;
