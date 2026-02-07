import React from 'react';
import { Animated } from 'react-native';
import {
  Circle,
  Defs,
  G,
  Path,
  Rect,
  Stop,
  Svg,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from 'react-native-svg';

import type { SlideIcon } from '@/constants/app';
import { useFloatAnimation } from '@/hooks/use-animations';

// ─── Island (Onboarding slide 1) ────────────────────────────────────
export function IslandIllustration() {
  return (
    <Svg width={160} height={140} viewBox="0 0 160 140">
      <Path
        d="M10 105 Q40 95 80 105 Q120 115 150 105 L150 130 Q120 120 80 130 Q40 140 10 130 Z"
        fill="#4FC3F7"
        opacity={0.35}
      />
      <Path
        d="M0 112 Q35 102 75 112 Q115 122 155 110"
        fill="none"
        stroke="#4FC3F7"
        strokeWidth="2"
        opacity={0.25}
      />
      <Path d="M30 105 Q50 70 80 75 Q110 70 130 105 Z" fill="#8BC34A" />
      <Path d="M38 105 Q55 82 80 85 Q105 82 122 105 Z" fill="#FFE082" />
      <Path
        d="M78 75 Q74 50 70 28"
        stroke="#8D6E63"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q52 14 34 24"
        stroke="#4CAF50"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q74 10 90 14"
        stroke="#4CAF50"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q56 34 44 44"
        stroke="#66BB6A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M70 28 Q82 26 94 36"
        stroke="#66BB6A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M105 60 L105 40"
        stroke="#E8960C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M105 40 L120 46 L105 52" fill="#FFD700" />
      <Circle cx="42" cy="55" r="2.5" fill="#FFD700" opacity={0.7} />
      <Circle cx="125" cy="72" r="2" fill="#FFD700" opacity={0.5} />
    </Svg>
  );
}

// ─── Piggy Bank (Onboarding slide 2) ────────────────────────────────
export function PiggyIllustration() {
  return (
    <Svg width={160} height={140} viewBox="0 0 160 140">
      <Rect x="110" y="70" width="28" height="6" rx="3" fill="#FFD700" opacity={0.5} />
      <Rect x="112" y="62" width="24" height="6" rx="3" fill="#FFD700" opacity={0.6} />
      <Rect x="114" y="54" width="20" height="6" rx="3" fill="#FFD700" opacity={0.7} />
      <G>
        <Circle cx="72" cy="80" r="36" fill="#FF8FAB" />
        <Circle cx="72" cy="80" r="36" fill="none" stroke="#E8728A" strokeWidth="2" />
        <Rect x="93" y="74" width="20" height="14" rx="7" fill="#FFB3C6" />
        <Circle cx="100" cy="79" r="2" fill="#E8728A" />
        <Circle cx="106" cy="79" r="2" fill="#E8728A" />
        <Circle cx="84" cy="70" r="4" fill="#FFFFFF" />
        <Circle cx="85" cy="69.5" r="2.5" fill="#1A1B4B" />
        <Circle cx="86" cy="68.5" r="1" fill="#FFFFFF" />
        <Path
          d="M58 55 Q52 38 65 42 Q68 48 62 58"
          fill="#FF8FAB"
          stroke="#E8728A"
          strokeWidth="1.5"
        />
        <Rect x="64" y="44" width="16" height="3" rx="1.5" fill="#E8728A" />
        <Rect
          x="52"
          y="108"
          width="8"
          height="12"
          rx="4"
          fill="#FF8FAB"
          stroke="#E8728A"
          strokeWidth="1.5"
        />
        <Rect
          x="80"
          y="108"
          width="8"
          height="12"
          rx="4"
          fill="#FF8FAB"
          stroke="#E8728A"
          strokeWidth="1.5"
        />
      </G>
      <G>
        <Defs>
          <SvgLinearGradient id="piggyCoinGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="72" cy="28" r="12" fill="url(#piggyCoinGrad)" />
        <Circle cx="72" cy="28" r="8.5" fill="none" stroke="#E8960C" strokeWidth="1" />
        <SvgText x="72" y="33" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B8760A">
          £
        </SvgText>
      </G>
      <Circle cx="28" cy="65" r="2.5" fill="#FFD700" opacity={0.6} />
      <Circle cx="130" cy="48" r="2" fill="#FFD700" opacity={0.5} />
    </Svg>
  );
}

// ─── Trophy (Onboarding slide 3) ────────────────────────────────────
export function TrophyIllustration() {
  return (
    <Svg width={160} height={140} viewBox="0 0 160 140">
      <Circle cx="30" cy="30" r="4" fill="#FF2E91" opacity={0.6} />
      <Circle cx="135" cy="25" r="3" fill="#4FC3F7" opacity={0.6} />
      <Rect
        x="22"
        y="55"
        width="8"
        height="4"
        rx="2"
        fill="#FFD700"
        opacity={0.5}
        transform="rotate(-20 26 57)"
      />
      <Rect
        x="130"
        y="60"
        width="8"
        height="4"
        rx="2"
        fill="#10B981"
        opacity={0.5}
        transform="rotate(15 134 62)"
      />
      <Circle cx="45" cy="110" r="3" fill="#7000E0" opacity={0.4} />
      <Circle cx="120" cy="105" r="2.5" fill="#FF2E91" opacity={0.4} />
      <Defs>
        <SvgLinearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </SvgLinearGradient>
      </Defs>
      <Path d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z" fill="url(#trophyGrad)" />
      <Path
        d="M55 35 L55 80 Q55 95 80 95 Q105 95 105 80 L105 35 Z"
        fill="none"
        stroke="#E8960C"
        strokeWidth="2"
      />
      <Path
        d="M55 45 Q35 45 35 60 Q35 75 55 75"
        fill="none"
        stroke="#E8960C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M105 45 Q125 45 125 60 Q125 75 105 75"
        fill="none"
        stroke="#E8960C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M80 50 L83 59 L93 59 L85 65 L88 74 L80 68 L72 74 L75 65 L67 59 L77 59 Z"
        fill="#FFFFFF"
        opacity={0.9}
      />
      <Rect x="70" y="95" width="20" height="8" rx="2" fill="#E8960C" />
      <Rect x="62" y="103" width="36" height="8" rx="3" fill="#D4A056" />
      <Rect
        x="62"
        y="103"
        width="36"
        height="8"
        rx="3"
        fill="none"
        stroke="#C6893A"
        strokeWidth="1.5"
      />
      <SvgText x="80" y="115" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#8D6E63">
        #1
      </SvgText>
    </Svg>
  );
}

// ─── Student character ──────────────────────────────────────────────
export function StudentIllustration() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      <Rect x="38" y="52" width="44" height="50" rx="12" fill="#4FC3F7" />
      <Rect
        x="38"
        y="52"
        width="44"
        height="50"
        rx="12"
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
      />
      <Rect x="48" y="72" width="24" height="16" rx="4" fill="#FFFFFF" opacity={0.35} />
      <Path
        d="M46 52 Q46 40 60 38 Q74 40 74 52"
        fill="none"
        stroke="#2196F3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle cx="60" cy="28" r="18" fill="#FFD3B6" />
      <Circle cx="60" cy="28" r="18" fill="none" stroke="#F0B898" strokeWidth="1.5" />
      <Path d="M42 22 Q42 8 60 10 Q78 8 78 22 Q75 16 60 15 Q45 16 42 22 Z" fill="#5D4037" />
      <Circle cx="52" cy="27" r="3" fill="#FFFFFF" />
      <Circle cx="53" cy="26.5" r="1.8" fill="#1A1B4B" />
      <Circle cx="53.5" cy="25.8" r="0.7" fill="#FFFFFF" />
      <Circle cx="68" cy="27" r="3" fill="#FFFFFF" />
      <Circle cx="69" cy="26.5" r="1.8" fill="#1A1B4B" />
      <Circle cx="69.5" cy="25.8" r="0.7" fill="#FFFFFF" />
      <Path
        d="M54 34 Q60 39 66 34"
        fill="none"
        stroke="#D4836A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <G>
        <Defs>
          <SvgLinearGradient id="sCoinGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="96" cy="18" r="10" fill="url(#sCoinGrad)" />
        <Circle cx="96" cy="18" r="7" fill="none" stroke="#E8960C" strokeWidth="1" />
        <SvgText x="96" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B8760A">
          £
        </SvgText>
      </G>
      <Circle cx="22" cy="44" r="3" fill="#FFD700" opacity={0.6} />
    </Svg>
  );
}

// ─── Teacher character ──────────────────────────────────────────────
export function TeacherIllustration() {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      <Path d="M35 102 Q35 72 60 68 Q85 72 85 102 Z" fill="#7000E0" />
      <Path
        d="M35 102 Q35 72 60 68 Q85 72 85 102 Z"
        fill="none"
        stroke="#5B00B8"
        strokeWidth="1.5"
      />
      <Path
        d="M50 70 L60 80 L70 70"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="60" cy="38" r="22" fill="#FFD3B6" />
      <Circle cx="60" cy="38" r="22" fill="none" stroke="#F0B898" strokeWidth="1.5" />
      <Path d="M38 30 Q38 12 60 14 Q82 12 82 30 Q78 20 60 18 Q42 20 38 30 Z" fill="#3E2723" />
      <Circle cx="50" cy="37" r="7" fill="none" stroke="#455A64" strokeWidth="2" />
      <Circle cx="70" cy="37" r="7" fill="none" stroke="#455A64" strokeWidth="2" />
      <Path d="M57 37 L63 37" stroke="#455A64" strokeWidth="1.5" />
      <Path d="M43 35 L38 33" stroke="#455A64" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M77 35 L82 33" stroke="#455A64" strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="50" cy="37" r="2" fill="#1A1B4B" />
      <Circle cx="50.5" cy="36.2" r="0.8" fill="#FFFFFF" />
      <Circle cx="70" cy="37" r="2" fill="#1A1B4B" />
      <Circle cx="70.5" cy="36.2" r="0.8" fill="#FFFFFF" />
      <Path
        d="M53 46 Q60 51 67 46"
        fill="none"
        stroke="#D4836A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Rect x="88" y="55" width="22" height="28" rx="3" fill="#FFE082" />
      <Rect
        x="88"
        y="55"
        width="22"
        height="28"
        rx="3"
        fill="none"
        stroke="#E8960C"
        strokeWidth="1.5"
      />
      <Rect x="94" y="52" width="10" height="6" rx="2" fill="#D4A056" />
      <Path d="M93 64 L105 64" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M93 69 L105 69" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M93 74 L100 74" stroke="#D4A056" strokeWidth="1.5" strokeLinecap="round" />
      <Circle cx="18" cy="60" r="3" fill="#FFD700" opacity={0.6} />
    </Svg>
  );
}

// ─── Island icon (splash screen) ────────────────────────────────────
export function IslandIcon() {
  return (
    <Svg width={120} height={100} viewBox="0 0 120 100">
      <Path
        d="M10 75 Q30 68 60 75 Q90 82 110 75 L110 95 Q90 88 60 95 Q30 102 10 95 Z"
        fill="#4FC3F7"
        opacity={0.5}
      />
      <Path d="M25 75 Q40 55 60 58 Q80 55 95 75 Z" fill="#8BC34A" />
      <Path d="M30 75 Q45 65 60 67 Q75 65 90 75 Z" fill="#FFE082" />
      <Path
        d="M58 58 Q55 40 52 25"
        stroke="#8D6E63"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q40 15 28 22"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q55 10 68 12"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q42 28 35 35"
        stroke="#66BB6A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M52 25 Q60 22 70 28"
        stroke="#66BB6A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Rect x="62" y="62" width="14" height="10" rx="2" fill="#D4A056" />
      <Rect x="62" y="62" width="14" height="4" rx="1" fill="#C6893A" />
      <Circle cx="69" cy="67" r="1.5" fill="#FFD700" />
    </Svg>
  );
}

// ─── Floating coin (splash screen) ─────────────────────────────────
interface FloatingCoinProps {
  delay: number;
  startX: number;
  startY: number;
  size: number;
  opacity: number;
}

export function FloatingCoin({ delay, startX, startY, size, opacity }: FloatingCoinProps) {
  const { fadeIn, translateY } = useFloatAnimation(delay, 18);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        opacity: Animated.multiply(fadeIn, opacity),
        transform: [{ translateY }],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Defs>
          <SvgLinearGradient id={`coinGrad${delay}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#FFD700" />
            <Stop offset="1" stopColor="#F5A623" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="20" cy="20" r="18" fill={`url(#coinGrad${delay})`} />
        <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
        <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">
          £
        </SvgText>
      </Svg>
    </Animated.View>
  );
}

// ─── Lookup helper ──────────────────────────────────────────────────
const ILLUSTRATION_MAP: Record<SlideIcon, React.FC> = {
  island: IslandIllustration,
  piggy: PiggyIllustration,
  trophy: TrophyIllustration,
};

export function SlideIllustration({ icon }: { icon: SlideIcon }) {
  const Component = ILLUSTRATION_MAP[icon];
  return Component ? <Component /> : null;
}
