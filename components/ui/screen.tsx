import { cn } from "@/lib/utils";
import * as React from "react";
import { ScrollView, View } from "react-native";

type ScreenProps = {
  children?: React.ReactNode;
  className?: string;
};

const Screen = ({ children, className }: ScreenProps) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className={cn("p-4", className)}>{children}</View>
    </ScrollView>
  );
};

export default Screen;
