import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="role-select" />
      <Stack.Screen name="personalization" />
      <Stack.Screen name="student-setup" />
      <Stack.Screen name="teacher-login" />
      <Stack.Screen name="teacher-register" />
    </Stack>
  );
}
