import React from 'react';
import { StatusBar, View, type ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  /** Show the subtle decorative gradient circles in the background */
  showDecoration?: boolean;
  /** Animate the content in with a fade */
  animate?: boolean;
  /** Additional padding at the top beyond safe area */
  topPadding?: number;
  /** Additional padding at the bottom beyond safe area */
  bottomPadding?: number;
  /** Extra styles for the inner content container */
  contentStyle?: ViewStyle;
}

export function ScreenWrapper({
  children,
  showDecoration = true,
  animate = true,
  topPadding = 20,
  bottomPadding = 16,
  contentStyle,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = colors[theme];

  const content = (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top + topPadding,
          paddingBottom: insets.bottom + bottomPadding,
        },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Decorative background circles */}
      {showDecoration && (
        <>
          <View
            style={{
              position: 'absolute',
              top: -80,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: 130,
              backgroundColor: `${c.gradientEnd}0C`,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: `${c.gradientEnd}08`,
            }}
          />
        </>
      )}

      {animate ? (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400 }}
          style={{ flex: 1 }}
        >
          {content}
        </MotiView>
      ) : (
        content
      )}
    </View>
  );
}
