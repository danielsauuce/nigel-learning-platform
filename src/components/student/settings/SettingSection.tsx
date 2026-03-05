import React from 'react';
import { Text, View, Platform } from 'react-native';
import { MotiView } from 'moti';

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
  index: number;
}

export function SettingSection({ title, children, index }: SettingSectionProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 14 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'spring',
        damping: 16,
        stiffness: 120,
        delay: 200 + index * 80,
      }}
      className="mx-6 mb-5"
    >
      <Text className="mb-2 font-poppins-bold text-xs uppercase tracking-wider text-muted-foreground">
        {title}
      </Text>

      <View
        className="rounded-2xl border border-border bg-card px-4"
        style={Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
          },
          android: { elevation: 1 },
        })}
      >
        {children}
      </View>
    </MotiView>
  );
}
