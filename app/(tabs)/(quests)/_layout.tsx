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
        options={{
          title: "Quest",
          headerLargeTitleEnabled: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default QuestsStack;
