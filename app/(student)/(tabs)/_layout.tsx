import { Tabs } from 'expo-router';
import { LayoutDashboard } from 'lucide-react-native';
import React from 'react';

export default function StudentTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:false,
        animation: 'shift',
        tabBarStyle: {
          backgroundColor: '#1A1B4B',
          borderTopColor: 'rgba(255,255,255,0.08)',
          borderTopWidth: 1,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#4FC3F7',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
        tabBarLabelStyle: {
          fontFamily: 'Poppins_500Medium',
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
    </Tabs>
  );
}
