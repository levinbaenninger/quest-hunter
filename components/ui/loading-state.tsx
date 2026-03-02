import { ActivityIndicator, ScrollView } from "react-native";

export const LoadingState = () => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerClassName="items-center pt-8"
  >
    <ActivityIndicator />
  </ScrollView>
);
