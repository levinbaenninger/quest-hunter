import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ScrollView, View } from "react-native";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Something went wrong",
  description,
  onRetry,
}: ErrorStateProps) => (
  <ScrollView contentContainerClassName="grow items-center justify-center gap-1 pt-8">
    <View className="gap-0.5 items-center">
      <Text className="font-semibold">{title}</Text>
      {description && (
        <Text className="text-muted-foreground text-center text-sm">
          {description}
        </Text>
      )}
    </View>
    {onRetry && (
      <Button onPress={onRetry} variant="outline" className="mt-2">
        <Text>Try again</Text>
      </Button>
    )}
  </ScrollView>
);
