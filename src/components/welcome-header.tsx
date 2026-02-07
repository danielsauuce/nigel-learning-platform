import React from 'react';
import { Animated, Text, View } from 'react-native';

interface WelcomeHeaderProps {
  animatedStyle: Animated.AnimatedProps<any>['style'];
}

export function WelcomeHeader({ animatedStyle }: WelcomeHeaderProps) {
  return (
    <Animated.View
      style={{
        paddingHorizontal: 32,
        marginBottom: 8,
        ...animatedStyle,
      }}
    >
      <Text
        className="mt-8 font-poppins-medium text-base"
        style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }}
      >
        Welcome to
      </Text>

      <View className="flex-row items-baseline" style={{ marginTop: 2 }}>
        <Text
          className="font-fredoka text-4xl leading-[42px] text-white"
          style={{
            textShadowColor: 'rgba(0,0,0,0.2)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          }}
        >
          Money{' '}
        </Text>
        <Text
          className="font-fredoka text-4xl leading-[42px] text-gold"
          style={{
            textShadowColor: 'rgba(245,166,35,0.35)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 10,
          }}
        >
          Islands
        </Text>
      </View>

      <Text
        className="font-poppins-regular text-sm"
        style={{ color: 'rgba(255,255,255,0.55)', marginTop: 6, letterSpacing: 0.2 }}
      >
        Your adventure in financial literacy starts here
      </Text>
    </Animated.View>
  );
}
