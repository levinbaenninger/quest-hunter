import Stack from "expo-router/stack";

const QuestsStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Quests", headerLargeTitleEnabled: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Quest", headerLargeTitleEnabled: false }}
      />
      <Stack.Screen
        name="[id]/location"
        options={{ title: "Location", headerLargeTitleEnabled: false }}
      />
    </Stack>
  );
};

export default QuestsStack;
