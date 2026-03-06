<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> v5
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
<<<<<<< HEAD
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="splash" />
=======
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
>>>>>>> v5
      <Stack.Screen name="welcome" />
      <Stack.Screen name="role-select" />
      <Stack.Screen name="personalization" />
      <Stack.Screen name="student-setup" />
      <Stack.Screen name="teacher-login" />
    </Stack>
  );
}
