import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface SettingRowProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

export function SettingRow({ icon, label, subtitle, onPress, isDestructive }: SettingRowProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: c.border,
      }}
    >
      <Text style={{ fontSize: 20 }}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 15,
            color: isDestructive ? '#EF4444' : c.foreground,
          }}
        >
          {label}
        </Text>
        {subtitle && (
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 12,
              color: c.mutedForeground,
              marginTop: 1,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      <ChevronRight size={18} color={c.mutedForeground} />
    </TouchableOpacity>
  );
}
