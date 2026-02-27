import Screen from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { View } from "react-native";

const ProfileScreen = () => {
  const { user } = useUser();

  return (
    <Screen className="gap-4">
      <View className="items-center gap-2">
        {user?.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : null}
        <View className="items-center gap-0.5">
          <Text className="text-xl font-semibold">{user?.fullName}</Text>
          <Text className="text-muted-foreground text-sm">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default ProfileScreen;
