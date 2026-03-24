import React from 'react';
import { Platform, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Mascot } from '@/svg/illustrations';
import { Lightbulb } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

export function ProTipBanner() {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 400 }}
      style={{ paddingHorizontal: 24, marginBottom: 20 }}
    >
      <View
        style={{
          backgroundColor: theme === 'dark' ? c.card : '#FDE8E4',
          borderRadius: 20,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          ...Platform.select({
            ios: {
              shadowColor: '#F9D6D0',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 10,
            },
            android: { elevation: 2 },
          }),
        }}
      >
        {/* Small mascot */}
        <View style={{ marginTop: -8 }}>
          <Mascot size={48} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 13,
              color: c.foreground,
              marginBottom: 3,
            }}
          >
            Pro Tip
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 12,
              color: c.mutedForeground,
              lineHeight: 18,
            }}
          >
            Saving just 10% of your pocket money each week adds up fast. Try the Budget Builder to
            see how!
          </Text>
        </View>
      </View>
    </MotiView>
  );
}
