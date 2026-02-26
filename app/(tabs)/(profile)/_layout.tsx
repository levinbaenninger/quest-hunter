import { useAuth } from "@clerk/clerk-expo";
import Stack from "expo-router/stack";
import { Pressable, Text } from "react-native";

const SignOutButton = () => {
  const { signOut } = useAuth();

  return (
    <Pressable onPress={() => signOut()} className="p-2">
      <Text className="text-destructive">Sign Out</Text>
    </Pressable>
  );
};

const ProfileStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerLargeTitle: true,
          headerRight: () => <SignOutButton />,
        }}
      />
    </Stack>
  );
};

export default ProfileStack;
