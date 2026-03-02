import { cn } from "@/lib/utils";
import * as React from "react";
import { ScrollView, View } from "react-native";

type ScreenProps = {
  children?: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export const Screen = ({ children, className, centered }: ScreenProps) => {
  if (centered) {
    return (
      <View className={cn("flex-1 justify-center items-center p-4", className)}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className={cn("p-4", className)}>{children}</View>
    </ScrollView>
  );
};
