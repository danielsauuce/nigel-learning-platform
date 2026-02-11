import { Tabs } from 'expo-router';

export default function StudentTabScreen() {
  return (
    <Tabs screenOptions={{ headerShown: false, animation: 'shift' }}>
      <Tabs.Screen name="Dashboard" />
    </Tabs>
  );
}
