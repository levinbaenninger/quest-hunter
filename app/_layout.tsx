import { convex } from '@/lib/convex-client';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { PortalHost } from '@rn-primitives/portal';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

const RootLayoutNavigation = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn ?? false}>
        <Stack.Screen name='index' />
      </Stack.Protected>
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <StatusBar style='auto' />
        <RootLayoutNavigation />
        <PortalHost />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default RootLayout;
