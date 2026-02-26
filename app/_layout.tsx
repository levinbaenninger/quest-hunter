import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

const RootLayout = () => {
  return (
    <>
      <StatusBar style='auto' />
      <Stack />
      <PortalHost />
    </>
  );
};

export default RootLayout;
