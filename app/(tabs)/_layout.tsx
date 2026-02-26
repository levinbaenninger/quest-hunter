import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

const TabLayout = () => {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="(quests)">
        <Icon sf="scroll.fill" />
        <Label>Quests</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(leaderboard)">
        <Icon sf="trophy.fill" />
        <Label>Leaderboard</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(profile)">
        <Icon sf="person.fill" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabLayout;
