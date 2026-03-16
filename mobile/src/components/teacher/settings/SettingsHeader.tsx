import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MotiView } from 'moti';
import { ArrowLeft, Info } from 'lucide-react-native';

interface SettingsHeaderProps {
  onBack: () => void;
  foregroundColor: string;
  mutedColor: string;
}

export function SettingsHeader({ onBack, foregroundColor, mutedColor }: SettingsHeaderProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130 }}
    >
      <View className="mb-4 flex-row items-center justify-between px-6">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowLeft size={22} color={foregroundColor} strokeWidth={2} />
          </TouchableOpacity>
          <Text className="font-fredoka text-xl text-foreground">Account Settings</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Info size={20} color={mutedColor} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
