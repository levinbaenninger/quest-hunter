import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Image, Platform, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS === "web") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

export function SocialConnections() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();

  async function onGooglePress() {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <View>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onPress={onGooglePress}
      >
        <Image
          className="size-4"
          source={{ uri: "https://img.clerk.com/static/google.png?width=160" }}
        />
        <Text>Google</Text>
      </Button>
    </View>
  );
}
