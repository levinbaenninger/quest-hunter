import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as React from 'react';
import { View } from 'react-native';
import { SocialConnections } from './social-connections';

export function SignInForm() {
  return (
    <View className='gap-6'>
      <Card className='border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5'>
        <CardHeader>
          <CardTitle className='text-center text-xl sm:text-left'>
            Sign in to Quest Hunter
          </CardTitle>
          <CardDescription className='text-center sm:text-left'>
            Welcome! Please sign in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
