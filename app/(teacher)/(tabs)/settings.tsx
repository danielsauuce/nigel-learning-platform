import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from 'moti';
import { ScreenWrapper } from '@/components/ui';
import { Settings } from 'lucide-react-native';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';

export default function TeacherSettingsRoute() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <View className="flex-1 items-center justify-center px-6">
        <MotiView
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 100 }}
          className="items-center"
        >
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Settings size={36} color={c.primary} strokeWidth={1.5} />
          </View>
          <Text className="mb-2 font-fredoka text-2xl text-foreground">Settings</Text>
          <Text className="text-center font-poppins-regular text-sm leading-5 text-muted-foreground">
            Profile, notifications, and preferences. Coming soon!
          </Text>
        </MotiView>
      </View>
    </ScreenWrapper>
  );
}
