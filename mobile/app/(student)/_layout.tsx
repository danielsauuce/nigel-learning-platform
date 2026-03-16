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
      <Stack.Screen name="life-event" />
      <Stack.Screen name="sim-results" />
      <Stack.Screen name="island-landing" />
      <Stack.Screen name="lesson" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="lesson-passed" />
      <Stack.Screen name="family-consent" />
      <Stack.Screen name="family-link" />
      <Stack.Screen name="parent-summary" />
      <Stack.Screen name="daily-challenge" />
      <Stack.Screen name="progress-stats" />
      <Stack.Screen name="edit-profile" />
    </Stack>
  );
}
