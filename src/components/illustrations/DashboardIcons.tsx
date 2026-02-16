import React from 'react';
import { Circle, Path, Rect, Text as SvgText } from 'react-native-svg';
import { BaseSvg } from './BaseSvg';

export function SimulatorIcon({ size = 36 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 36 36">
      <Rect
        x="4"
        y="8"
        width="28"
        height="22"
        rx="4"
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
      />
      <Path d="M4 15 L32 15" stroke="#FFD700" strokeWidth="1.5" />
      <Rect x="8" y="19" width="8" height="3" rx="1" fill="#FFD700" opacity={0.6} />
      <Rect x="8" y="24" width="12" height="3" rx="1" fill="#FFD700" opacity={0.4} />
      <Circle cx="27" cy="23" r="3.5" fill="#FFD700" opacity={0.7} />
      <SvgText x="27" y="25.5" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1A1B4B">
        £
      </SvgText>
    </BaseSvg>
  );
}

export function AchievementsIcon({ size = 36 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 36 36">
      <Path
        d="M18 4 L21 13 L31 13 L23 19 L26 28 L18 22 L10 28 L13 19 L5 13 L15 13 Z"
        fill="none"
        stroke="#FF2E91"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M18 8 L20 13.5 L26 13.5 L21 17.5 L23 23 L18 19 L13 23 L15 17.5 L10 13.5 L16 13.5 Z"
        fill="#FF2E91"
        opacity={0.25}
      />
    </BaseSvg>
  );
}

export function FamilyIcon({ size = 36 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 36 36">
      <Circle cx="12" cy="12" r="5" fill="none" stroke="#10B981" strokeWidth="2" />
      <Circle cx="24" cy="12" r="5" fill="none" stroke="#10B981" strokeWidth="2" />
      <Path
        d="M4 30 Q4 22 12 20 Q16 19 18 20"
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M32 30 Q32 22 24 20 Q20 19 18 20"
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="18" cy="26" r="3" fill="#10B981" opacity={0.4} />
    </BaseSvg>
  );
}
