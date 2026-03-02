import { Stack } from "expo-router";

const FullscreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(quest)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FullscreenLayout;
