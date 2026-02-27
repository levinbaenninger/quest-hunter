import { useAuth } from "@clerk/clerk-expo";
import Stack from "expo-router/stack";
import { useState } from "react";
import { Alert, Pressable, Text } from "react-native";

const SignOutButton = () => {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOut();
    } catch {
      Alert.alert("Sign out failed", "Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Pressable onPress={handleSignOut} disabled={isSigningOut} className="p-2">
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
