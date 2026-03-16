import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}

export function SettingRow({ icon, label, subtitle, trailing, onPress, danger }: SettingRowProps) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className="flex-row items-center gap-3.5 py-3.5"
    >
      <View
        className={`h-9 w-9 items-center justify-center rounded-xl ${
          danger ? 'bg-destructive/10' : 'bg-primary/8'
        }`}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text
          className={`font-poppins-medium text-sm ${
            danger ? 'text-destructive' : 'text-foreground'
          }`}
        >
          {label}
        </Text>
        {subtitle && (
          <Text className="font-poppins-regular text-xs text-muted-foreground">{subtitle}</Text>
        )}
      </View>
      {trailing || (onPress && <ChevronRight size={16} color="rgb(107,114,128)" strokeWidth={2} />)}
    </TouchableOpacity>
  );
}
