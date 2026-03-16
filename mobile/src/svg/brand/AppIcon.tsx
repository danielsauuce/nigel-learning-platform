import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Text as SvgText,
  Circle,
  Path,
} from 'react-native-svg';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface AppIconProps {
  size?: number;
}

/**
 * Nigel app icon — Puzzle-shaped purple square with "N" and pink accent.
 */
export function AppIcon({ size = 80 }: AppIconProps) {
  const { theme } = useTheme();
  const c = colors[theme];

  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Defs>
        <LinearGradient id="appIconGrad" x1="0" y1="0" x2="80" y2="80">
          <Stop offset="0%" stopColor={c.primary} />
          <Stop offset="100%" stopColor="#D4C8FF" />
        </LinearGradient>
      </Defs>
      <Rect width="80" height="80" rx="22" fill="url(#appIconGrad)" />
      <SvgText x="18" y="55" fontFamily="Poppins" fontWeight="800" fontSize="42" fill="white">
        N
      </SvgText>
      <Circle cx="62" cy="18" r="9" fill="#F7B6B6" />
      <Circle cx="62" cy="18" r="4.5" fill="#F9D6D0" />
    </Svg>
  );
}
