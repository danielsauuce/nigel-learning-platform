import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface PrivacyCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function PrivacyCheckbox({ checked, onToggle }: PrivacyCheckboxProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onToggle}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingVertical: 8,
      }}
    >
      <MotiView
        animate={{
          backgroundColor: checked ? '#B9A7F8' : 'transparent',
          borderColor: checked ? '#B9A7F8' : c.border,
        }}
        transition={{ type: 'timing', duration: 200 }}
        style={{
          width: 24,
          height: 24,
          borderRadius: 8,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {checked && (
          <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Poppins_700Bold' }}>✓</Text>
        )}
      </MotiView>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 13,
            color: c.foreground,
            lineHeight: 20,
          }}
        >
          I agree to the{' '}
          <Text style={{ color: '#B9A7F8', fontFamily: 'Poppins_600SemiBold' }}>
            Privacy Policy
          </Text>{' '}
          and{' '}
          <Text style={{ color: '#B9A7F8', fontFamily: 'Poppins_600SemiBold' }}>
            Terms of Service
          </Text>
          . My data will only be used to personalize my learning experience.
        </Text>
      </View>
    </TouchableOpacity>
  );
}
