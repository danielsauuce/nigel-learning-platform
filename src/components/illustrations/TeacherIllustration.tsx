import React from 'react';
import { Circle, Path, Rect } from 'react-native-svg';
import { BaseSvg } from './BaseSvg';

export function TeacherIllustration({ size = 120 }: { size?: number }) {
  return (
    <BaseSvg width={size} height={size} viewBox="0 0 120 120">
      <Path d="M35 102 Q35 72 60 68 Q85 72 85 102 Z" fill="#7000E0" />
      <Circle cx="60" cy="38" r="22" fill="#FFD3B6" />

      <Rect x="88" y="55" width="22" height="28" rx="3" fill="#FFE082" />
    </BaseSvg>
  );
}
