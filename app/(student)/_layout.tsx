import React from 'react';
import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="simulator" />
      <Stack.Screen name="payslip" />
      <Stack.Screen name="budget-builder" />
    </Stack>
  );
}
