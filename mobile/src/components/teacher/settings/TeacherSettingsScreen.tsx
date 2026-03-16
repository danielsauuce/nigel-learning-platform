import React from 'react';
import { ScrollView, StatusBar, Switch, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { Moon, Sun } from 'lucide-react-native';

import { SettingsHeader } from '../settings/SettingsHeader';
import { ProfileCard } from '../settings/ProfileCard';
import { SettingsSection } from '../settings/SettingsSection';
import { SettingRow } from '../settings/SettingRow';
import { FamilySharingCard } from '../settings/FamilySharingCard';
import { useSettings } from '../settings/hooks/useSettings';
import {
  GENERAL_SETTINGS,
  APPEARANCE_SETTINGS,
  SUPPORT_SETTINGS,
  APP_VERSION,
  APP_TAGLINE,
} from '../settings/constants/settings';

export function TeacherSettingsScreen() {
  const insets = useSafeAreaInsets();
  const {
    theme,
    isDark,
    toggleTheme,
    notifications,
    setNotifications,
    consent,
    toggleConsent,
    handleLogout,
    handleBack,
  } = useSettings();

  const c = colors[theme];

  // Map state keys to values and handlers
  const switchMap: Record<string, { value: boolean; onToggle: (v: boolean) => void }> = {
    notifications: { value: notifications, onToggle: setNotifications },
    darkMode: { value: isDark, onToggle: () => toggleTheme() },
  };

  // Map action keys to handlers
  const actionMap: Record<string, () => void> = {
    privacy: () => {},
    help: () => {},
    privacyPolicy: () => {},
    logout: handleLogout,
  };

  const renderRows = (items: typeof GENERAL_SETTINGS) =>
    items.map((item, i) => {
      const Icon = item.icon;
      const isLast = i === items.length - 1;

      // Resolve icon for dark mode
      const iconElement =
        item.key === 'darkMode' ? (
          isDark ? (
            <Moon size={16} color={c.primary} strokeWidth={2} />
          ) : (
            <Sun size={16} color={c.primary} strokeWidth={2} />
          )
        ) : (
          <Icon size={16} color={item.danger ? c.destructive : c.primary} strokeWidth={2} />
        );

      // Resolve subtitle for dark mode
      const subtitle =
        item.key === 'darkMode'
          ? isDark
            ? 'Currently using dark theme'
            : 'Currently using light theme'
          : item.subtitle;

      // Resolve trailing element
      let trailing: React.ReactNode = undefined;
      if (item.type === 'switch' && item.stateKey) {
        const sw = switchMap[item.stateKey];
        trailing = (
          <Switch
            value={sw.value}
            onValueChange={sw.onToggle}
            trackColor={{ false: c.border, true: c.primary + '60' }}
            thumbColor={sw.value ? c.primary : c.mutedForeground}
          />
        );
      } else if (item.trailing === 'language') {
        trailing = (
          <View className="rounded-lg border border-border px-2.5 py-1">
            <Text className="font-poppins-medium text-xs text-foreground">English</Text>
          </View>
        );
      }

      return (
        <React.Fragment key={item.key}>
          <SettingRow
            icon={iconElement}
            label={item.label}
            subtitle={subtitle}
            trailing={trailing}
            onPress={actionMap[item.key]}
            danger={item.danger}
          />
          {!isLast && <View className="h-px bg-border" />}
        </React.Fragment>
      );
    });

  return (
    <View className="flex-1 bg-background">
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400 }}
        style={{ flex: 1, paddingTop: insets.top + 8 }}
      >
        <SettingsHeader
          onBack={handleBack}
          foregroundColor={c.foreground}
          mutedColor={c.mutedForeground}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <ProfileCard primaryColor={c.primary} />

          <SettingsSection title="General" delay={200}>
            {renderRows(GENERAL_SETTINGS)}
          </SettingsSection>

          <SettingsSection title="Appearance" delay={280}>
            {renderRows(APPEARANCE_SETTINGS)}
          </SettingsSection>

          {/* <FamilySharingCard
            consent={consent}
            onToggleConsent={toggleConsent}
            primaryColor={c.primary}
            foregroundColor={c.foreground}
          /> */}

          <SettingsSection title="Support" delay={440}>
            {renderRows(SUPPORT_SETTINGS)}
          </SettingsSection>

          {/* Version footer */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 600 }}
            className="mb-4 mt-2 items-center"
          >
            <Text className="font-poppins-regular text-[10px] text-muted-foreground">
              {APP_VERSION}
            </Text>
            <Text className="font-poppins-regular text-[10px] text-muted-foreground">
              {APP_TAGLINE}
            </Text>
          </MotiView>
        </ScrollView>
      </MotiView>
    </View>
  );
}
