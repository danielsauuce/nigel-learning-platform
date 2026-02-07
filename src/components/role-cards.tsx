import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { RadioIndicator } from '@/components/ui/radio-indicator';
import type { RoleType } from '@/constants/app';
import { usePulse } from '@/hooks/use-animations';

interface Role {
  key: RoleType;
  title: string;
  description: string;
  Illustration: React.ComponentType;
  accentColor: string;
  selectedGradient: [string, string];
}

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  animatedStyle: Animated.AnimatedProps<any>['style'];
  onSelect: (role: RoleType) => void;
}

export function RoleCard({ role, isSelected, animatedStyle, onSelect }: RoleCardProps) {
  const pulse = usePulse();

  const handlePress = () => {
    onSelect(role.key);
    pulse.pulse();
  };

  return (
    <Animated.View
      style={{
        ...animatedStyle,
        transform: [...(animatedStyle.transform || []), { scale: pulse.scale }],
      }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={{ borderRadius: 20 }}>
        <GlassCard
          colors={
            isSelected
              ? [...role.selectedGradient]
              : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.04)']
          }
          borderWidth={isSelected ? 2 : 1.5}
          borderColor={isSelected ? role.accentColor : 'rgba(255,255,255,0.1)'}
          borderRadius={20}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16,
            gap: 14,
          }}
        >
          <View className="items-center justify-center" style={{ width: 90, height: 90 }}>
            <role.Illustration />
          </View>

          <View className="flex-1">
            <Text className="font-fredoka text-[22px] text-white" style={{ letterSpacing: -0.3 }}>
              {role.title}
            </Text>
            <Text
              className="font-poppins-regular text-[13px] leading-[19px]"
              style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}
            >
              {role.description}
            </Text>
          </View>

          <RadioIndicator selected={isSelected} color={role.accentColor} />
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}
