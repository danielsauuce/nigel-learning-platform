import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  ChevronRight,
  User,
  Lock,
  Bell,
  Palette,
  HelpCircle,
  MessageCircle,
  LogOut,
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size: number; color: string; strokeWidth: number }>
> = {
  user: User,
  lock: Lock,
  bell: Bell,
  palette: Palette,
  help: HelpCircle,
  feedback: MessageCircle,
  logout: LogOut,
};

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
  const IconComponent = ICON_MAP[icon];

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
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: isDestructive ? `${c.destructive}15` : `${c.primary}18`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {IconComponent && (
          <IconComponent
            size={17}
            color={isDestructive ? c.destructive : c.primary}
            strokeWidth={2}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 15,
            color: isDestructive ? c.destructive : c.foreground,
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
