import React from 'react';
import { Circle, Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import { BaseSvg } from './BaseSvg';

/**
 * Compass illustration for question screens — directional/discovery theme.
 */
export function CompassIcon({ size = 56 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 56 56">
      <Circle
        cx="28"
        cy="28"
        r="26"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />
      <Circle cx="28" cy="28" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <Path d="M28 10 L31 26 L28 28 L25 26 Z" fill="#4FC3F7" />
      <Path d="M28 46 L31 30 L28 28 L25 30 Z" fill="#FF2E91" opacity={0.7} />
      <Circle cx="28" cy="28" r="3" fill="#FFD700" />
    </BaseSvg>
  );
}

/**
 * Target illustration for question screens — goal/improvement theme.
 */
export function TargetIcon({ size = 56 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 56 56">
      <Circle
        cx="28"
        cy="28"
        r="26"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />
      <Circle cx="28" cy="28" r="20" fill="none" stroke="rgba(255,215,0,0.3)" strokeWidth="2" />
      <Circle cx="28" cy="28" r="13" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
      <Circle cx="28" cy="28" r="6" fill="#FFD700" opacity={0.8} />
      <Defs>
        <SvgLinearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#4FC3F7" />
          <Stop offset="1" stopColor="#10B981" />
        </SvgLinearGradient>
      </Defs>
      <Path d="M42 8 L44 18 L34 16 Z" fill="url(#arrowGrad)" />
      <Path d="M43 9 L30 26" stroke="url(#arrowGrad)" strokeWidth="2" strokeLinecap="round" />
    </BaseSvg>
  );
}
