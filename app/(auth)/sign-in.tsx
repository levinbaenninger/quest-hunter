import { SignInForm } from "@/components/ui/sign-in-form";
import { View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <SignInForm />
    </View>
  );
}
