import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/ui';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Mascot } from '@/svg/illustrations';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';
import { useAuth } from '@/context';
import { SettingSection } from './SettingSection';
import { SettingRow } from './SettingRow';
import { SETTINGS_SECTIONS } from './config/settings.config';

export function SettingsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors[theme];
  const { reset } = useAuth();

  const handleSettingPress = (key: string) => {
    switch (key) {
      case 'profile':
        router.push('/(student)/edit-profile' as any);
        break;
      case 'privacy':
        router.push('/(student)/family-consent' as any);
        break;
      case 'logout':
        reset();
        router.replace('/(auth)');
        break;
      default:
        break;
    }
  };

  return (
    <ScreenWrapper topPadding={16}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120 }}
          style={{
            paddingHorizontal: 24,
            marginBottom: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Mascot size={32} />
            <Text style={{ fontFamily: 'Fredoka_700Bold', fontSize: 28, color: c.foreground }}>
              Settings
            </Text>
          </View>
        </MotiView>

        {/* Dark Mode Toggle */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 50 }}
          style={{ paddingHorizontal: 24, marginBottom: 20 }}
        >
          <View
            style={{
              backgroundColor: c.card,
              borderRadius: 18,
              overflow: 'hidden',
              borderWidth: 1.5,
              borderColor: theme === 'dark' ? '#B9A7F830' : '#E8E4F0',
            }}
          >
            <ThemeToggle variant="row" />
          </View>
        </MotiView>

        {SETTINGS_SECTIONS.map((section, sIdx) => (
          <SettingSection
            key={section.title || `sec-${sIdx}`}
            title={section.title}
            delay={80 + sIdx * 50}
          >
            {section.items.map((item) => (
              <SettingRow
                key={item.key}
                icon={item.icon}
                label={item.label}
                subtitle={item.subtitle}
                onPress={() => handleSettingPress(item.key)}
                isDestructive={item.key === 'logout'}
              />
            ))}
          </SettingSection>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}
