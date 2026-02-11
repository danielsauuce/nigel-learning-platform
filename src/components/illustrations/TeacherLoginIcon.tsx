import React from 'react';
import {
  Circle,
  Defs,
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
} from 'react-native-svg';

export function TeacherLoginIcon() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80">
      <Defs>
        <SvgLinearGradient id="teacherGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A855F7" />
          <Stop offset="1" stopColor="#7C3AED" />
        </SvgLinearGradient>
      </Defs>

      {/* Head */}
      <Circle cx="40" cy="26" r="14" fill="url(#teacherGrad)" opacity={0.3} />
      <Circle cx="40" cy="26" r="14" fill="none" stroke="#A855F7" strokeWidth="2.5" />

      {/* Body */}
      <Path d="M16 68 Q16 48 40 44 Q64 48 64 68" fill="url(#teacherGrad)" opacity={0.15} />
      <Path
        d="M16 68 Q16 48 40 44 Q64 48 64 68"
        fill="none"
        stroke="#A855F7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Glasses */}
      <Circle cx="34" cy="25" r="5" fill="none" stroke="#A855F7" strokeWidth="1.5" />
      <Circle cx="46" cy="25" r="5" fill="none" stroke="#A855F7" strokeWidth="1.5" />
      <Path d="M39 25 L41 25" stroke="#A855F7" strokeWidth="1.5" />

      {/* Book */}
      <Rect x="30" y="52" width="20" height="14" rx="2" fill="#A855F7" opacity={0.25} />
      <Path d="M40 52 L40 66" stroke="#A855F7" strokeWidth="1" opacity={0.5} />
      <Path
        d="M33 56 L37 56"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M43 56 L47 56"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M33 59 L37 59"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <Path
        d="M43 59 L47 59"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </Svg>
  );
}
