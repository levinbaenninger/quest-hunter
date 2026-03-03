import { SocialConnections } from "@/components/auth/social-connections";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { View } from "react-native";

export function SignInForm() {
  return (
    <View className="gap-6">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Bei Quest Hunter anmelden
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Willkommen! Bitte melde dich an, um fortzufahren.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
