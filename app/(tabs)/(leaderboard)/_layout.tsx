import Stack from "expo-router/stack";

const LeaderboardStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Leaderboard", headerLargeTitleEnabled: true }}
      />
    </Stack>
  );
};

export default LeaderboardStack;
