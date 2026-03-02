import Stack from "expo-router/stack";

const QuestsStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Quests", headerLargeTitleEnabled: true }}
      />
    </Stack>
  );
};

export default QuestsStack;
