import React, { useCallback, useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context';
import { colors } from '@/constants/colors';
import { ScreenWrapper } from '@/components/ui';
import { IdCard } from 'lucide-react-native';
import { settingsConfig } from './config/settings.config';
import { SettingRow } from './SettingRow';
import { SettingSection } from './SettingSection';

export function SettingsScreen() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const c = colors[theme];

  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const isDark = theme === 'dark';

  // Map config state keys to actual state + theme toggle
  const stateMap: Record<string, [boolean, (v: boolean) => void]> = {
    notifications: [notifications, setNotifications],
    darkMode: [isDark, () => toggle()],
    soundEffects: [soundEffects, setSoundEffects],
  };

  const handleLogout = useCallback(() => {
    router.replace('/(auth)' as any);
  }, [router]);

  return (
    <ScreenWrapper topPadding={12} showDecoration={false}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 130 }}
          className="mb-4 px-6"
        >
          <Text className="font-fredoka text-2xl text-foreground">Settings</Text>
        </MotiView>

        {/* Profile card */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 110, delay: 100 }}
          className="mx-6 mb-6"
        >
          <View className="flex-row items-center gap-3.5 rounded-2xl border border-border bg-card p-4">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/15">
              <Text className="font-poppins-bold text-xl text-primary">A</Text>
            </View>
            <View className="flex-1">
              <Text className="font-poppins-bold text-base text-foreground">Alex Chen</Text>
              <View className="mt-0.5 flex-row items-center gap-2">
                <View className="flex-row items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5">
                  <IdCard size={10} color={c.primary} strokeWidth={2} />
                  <Text className="font-poppins-semibold text-[10px] text-primary">STU-4782</Text>
                </View>
                <Text className="font-poppins-regular text-xs text-muted-foreground">Level 14</Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7} className="rounded-lg bg-primary/10 px-3 py-1.5">
              <Text className="font-poppins-semibold text-xs text-primary">Edit</Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Settings sections from config */}
        {settingsConfig.map((section, index) => (
          <SettingSection key={section.title} title={section.title} index={index}>
            {section.items.map((item) => {
              const Icon = item.icon;
              let trailing = null;
              let onPress: (() => void) | undefined;

              // Wire switches
              if (item.type === 'switch' && item.state) {
                const entry = stateMap[item.state];
                if (entry) {
                  const [value, setValue] = entry;
                  trailing = (
                    <Switch
                      value={value}
                      onValueChange={setValue}
                      trackColor={{
                        false: c.border,
                        true: c.primary,
                      }}
                      thumbColor="#FFFFFF"
                    />
                  );
                }
              }

              // Wire log out
              if (item.danger) {
                onPress = handleLogout;
              }

              // Wire Share with Family
              if (item.label === 'Share with Family') {
                onPress = () => router.push('/(student)/family-consent' as any);
              }

              return (
                <SettingRow
                  key={item.label}
                  label={item.label}
                  subtitle={item.subtitle}
                  icon={
                    <Icon
                      size={18}
                      color={item.danger ? c.destructive : c.primary}
                      strokeWidth={2}
                    />
                  }
                  trailing={trailing}
                  onPress={onPress}
                  danger={item.danger}
                />
              );
            })}
          </SettingSection>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
