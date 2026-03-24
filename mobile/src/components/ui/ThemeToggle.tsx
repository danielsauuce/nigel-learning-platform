import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Moon, Sun } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ThemeToggleProps {
  /** Compact pill style for headers, or full-width row style */
  variant?: 'pill' | 'row';
}

export function ThemeToggle({ variant = 'pill' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const c = colors[theme];
  const isDark = theme === 'dark';

  if (variant === 'row') {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggle}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 14,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
            {isDark ? (
              <Moon size={20} color="#B9A7F8" strokeWidth={2} />
            ) : (
              <Sun size={20} color="#F59E0B" strokeWidth={2} />
            )}
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 15,
                color: c.foreground,
              }}
            >
              Dark Mode
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 12,
                color: c.mutedForeground,
                marginTop: 1,
              }}
            >
              {isDark ? 'Currently on' : 'Currently off'}
            </Text>
          </View>
        </View>

        {/* Toggle switch */}
        <View
          style={{
            width: 52,
            height: 30,
            borderRadius: 15,
            backgroundColor: isDark ? '#B9A7F8' : '#E8E4F0',
            padding: 3,
            justifyContent: 'center',
          }}
        >
          <MotiView
            animate={{
              translateX: isDark ? 22 : 0,
            }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                },
                android: { elevation: 3 },
              }),
            }}
          >
            {isDark ? (
              <Moon size={14} color="#B9A7F8" strokeWidth={2.5} />
            ) : (
              <Sun size={14} color="#F7E6B6" strokeWidth={2.5} />
            )}
          </MotiView>
        </View>
      </TouchableOpacity>
    );
  }

  // Pill variant — compact for headers
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggle}
      style={{
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: isDark ? '#2A2A40' : '#F3F0FF',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
          },
          android: { elevation: 2 },
        }),
      }}
    >
      <MotiView
        key={theme}
        from={{ rotate: '0deg', scale: 0.5, opacity: 0 }}
        animate={{ rotate: '0deg', scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 150 }}
      >
        {isDark ? (
          <Moon size={20} color="#B9A7F8" strokeWidth={2} />
        ) : (
          <Sun size={20} color="#F7E6B6" strokeWidth={2} />
        )}
      </MotiView>
    </TouchableOpacity>
  );
}
