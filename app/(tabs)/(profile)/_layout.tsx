import { THEME } from "@/lib/theme";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Stack from "expo-router/stack";
import { useState } from "react";
import { Alert, Pressable } from "react-native";

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
      <Ionicons name="log-out-outline" size={20} color={THEME.destructive} />
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
