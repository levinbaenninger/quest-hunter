import { Text } from "@/components/ui/text";
import { View } from "react-native";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <View className="items-center gap-0.5 pt-8">
    <Text className="text-lg font-semibold">{title}</Text>
    {description && (
      <Text className="text-muted-foreground text-center text-sm">
        {description}
      </Text>
    )}
  </View>
);
