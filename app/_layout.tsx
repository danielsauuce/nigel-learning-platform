import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="index" />
      <Stack.Screen name="personalization" />
      <Stack.Screen name="(student)" />
      <Stack.Screen name="(teacher)" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="worries" />
      <Stack.Screen name="learning-style" />
    </Stack>
  );
}
