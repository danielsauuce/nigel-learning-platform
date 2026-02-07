import React from 'react';
import { Animated, Text, View } from 'react-native';

interface RoleSelectHeaderProps {
  animatedStyle: Animated.AnimatedProps<any>['style'];
}

export function RoleSelectHeader({ animatedStyle }: RoleSelectHeaderProps) {
  return (
    <Animated.View
      style={{
        marginBottom: 16,
        paddingHorizontal: 8,
        ...animatedStyle,
      }}
    >
      <Text
        className="mt-8 font-poppins-medium text-sm uppercase"
        style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 }}
      >
        Choose your role
      </Text>

      <Text
        className="font-fredoka text-[34px] leading-10 text-white"
        style={{
          marginTop: 4,
          textShadowColor: 'rgba(0,0,0,0.2)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 6,
        }}
      >
        Who are you?
      </Text>

      <Text
        className="font-poppins-regular text-sm"
        style={{ color: 'rgba(255,255,255,0.55)', marginTop: 6 }}
      >
        Pick how you'll use Money Islands
      </Text>
    </Animated.View>
  );
}
