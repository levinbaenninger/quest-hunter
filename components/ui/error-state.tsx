import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ScrollView, View } from "react-native";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Etwas ist schiefgelaufen",
  description,
  onRetry,
}: ErrorStateProps) => (
  <ScrollView contentContainerClassName="grow items-center justify-center gap-1 p-4">
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
        <Text>Nochmal versuchen</Text>
      </Button>
    )}
  </ScrollView>
);
