import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Home' }} />
      <View className='flex-1 items-center justify-center'>
        <Button onPress={() => alert('Hello User!')} variant='outline'>
          <Text>Click me</Text>
        </Button>
      </View>
    </>
  );
};

export default Index;
