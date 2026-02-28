import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Shield } from 'lucide-react-native';
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
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: 500 }}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: c.card,
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: c.border,
      }}
    >
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: checked ? c.gradientStart : c.border,
          backgroundColor: checked ? c.gradientStart : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
      >
        {checked && (
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Poppins_700Bold' }}>✓</Text>
        )}
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Poppins_500Medium',
            fontSize: 13,
            color: c.foreground,
            lineHeight: 20,
          }}
        >
          I agree to the{' '}
          <Text style={{ color: c.gradientStart, textDecorationLine: 'underline' }}>
            Privacy Policy
          </Text>{' '}
          and data usage for my personalized experience.
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <Shield size={13} color={c.mutedForeground} strokeWidth={2} />
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 11.5,
              color: c.mutedForeground,
            }}
          >
            Your data is encrypted and never sold.
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
