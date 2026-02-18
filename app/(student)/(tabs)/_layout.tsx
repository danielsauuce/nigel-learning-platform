import { Tabs } from 'expo-router';
import {
  BookOpen,
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
  Wallet,
} from 'lucide-react-native';
import React from 'react';

export default function StudentTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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

      <Tabs.Screen
        name="Learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} strokeWidth={1.8} />,
        }}
      />

      <Tabs.Screen
        name="Simulate"
        options={{
          title: 'Simulate',
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} strokeWidth={1.8} />,
        }}
      />

      <Tabs.Screen
        name="Progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <ChartNoAxesCombined size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} strokeWidth={1.8} />,
        }}
      />
    </Tabs>
  );
}
