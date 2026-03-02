import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

const QuestLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]/index"
        options={{
          headerLargeTitle: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="pl-1.5">
              <Ionicons name="chevron-back" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]/location/[locationId]"
        options={{
          headerBackVisible: false,
          headerLargeTitle: true,
        }}
      />
    </Stack>
  );
};

export default QuestLayout;
