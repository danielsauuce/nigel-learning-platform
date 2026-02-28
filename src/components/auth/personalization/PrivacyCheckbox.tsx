import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { Shield } from 'lucide-react-native';

interface PrivacyCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function PrivacyCheckbox({ checked, onToggle }: PrivacyCheckboxProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: 500 }}
      className="flex-row items-start gap-3 rounded-[14px] border border-border bg-card p-4"
    >
      {/* Checkbox */}
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        className={`mt-[1px] h-[22px] w-[22px] items-center justify-center rounded-md border-2 ${checked ? 'border-gradient-start bg-gradient-start' : 'border-border'} `}
      >
        {checked && <Text className="font-poppins-bold text-xs text-white">✓</Text>}
      </TouchableOpacity>

      {/* Text Content */}
      <View className="flex-1">
        <Text className="font-poppins-medium text-sm leading-5 text-foreground">
          I agree to the <Text className="text-gradient-start underline">Privacy Policy</Text> and
          data usage for my personalized experience.
        </Text>

        <View className="mt-1.5 flex-row items-center gap-1.5">
          <Shield size={13} strokeWidth={2} className="text-muted-foreground" />
          <Text className="font-poppins-regular text-[11.5px] text-muted-foreground">
            Your data is encrypted and never sold.
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
