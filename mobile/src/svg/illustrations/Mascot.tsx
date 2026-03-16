import React from 'react';
import Svg, { Ellipse, Circle, Path, Rect, G, Line, Text as SvgText } from 'react-native-svg';
import { View, Text, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';
import { useTheme } from '@/context';

interface MascotProps {
  size?: number;
}

const SCREEN_W = Dimensions.get('window').width;

/* ──────────────────────────────────────────────────
   BASE PUZZLE BODY — reused across all mascot states
   ────────────────────────────────────────────────── */
const PuzzleBody = ({ fill = '#B9A7F8', opacity = 1 }: { fill?: string; opacity?: number }) => (
  <Path
    d="M30 15C30 7 37 0 45 0L155 0C163 0 170 7 170 15L170 70L185 70C193 70 200 77 200 85L200 115C200 123 193 130 185 130L170 130L170 185C170 193 163 200 155 200L115 200L115 185C115 177 108 170 100 170C92 170 85 177 85 185L85 200L45 200C37 200 30 193 30 185L30 130L15 130C7 130 0 123 0 115L0 85C0 77 7 70 15 70L30 70Z"
    fill={fill}
    opacity={opacity}
  />
);

/**
 * DEFAULT MASCOT — neutral happy face, big eyes, buck teeth, pink cheeks, white drip arms.
 * Used: Splash, Dashboard header, onboarding, generic screens.
 */
export function Mascot({ size = 130 }: MascotProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const w = size;
  const h = size * 1.35;

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 200 270" fill="none">
        <PuzzleBody fill={c.primary} />
        {/* Eyes */}
        <Ellipse cx="75" cy="92" rx="18" ry="20" fill="#22223B" />
        <Ellipse cx="130" cy="92" rx="18" ry="20" fill="#22223B" />
        <Circle cx="82" cy="86" r="5.5" fill="white" />
        <Circle cx="137" cy="86" r="5.5" fill="white" />
        {/* Mouth */}
        <Path d="M80 130 Q100 160 125 133" fill="#22223B" />
        <Rect x="95" y="130" width="8" height="11" rx="2" fill="white" />
        <Rect x="106" y="130" width="8" height="11" rx="2" fill="white" />
        {/* Cheeks */}
        <Ellipse cx="50" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
        <Ellipse cx="155" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
        {/* White drip arms */}
        <G opacity={0.85}>
          <Path d="M18 140 Q8 175 18 210 Q22 220 26 210 Q32 180 28 145 Z" fill="white" />
          <Path d="M182 140 Q192 170 182 205 Q178 215 174 205 Q168 180 172 145 Z" fill="white" />
        </G>
      </Svg>
    </View>
  );
}

/**
 * CELEBRATING MASCOT — jumping with graduation cap, arms up, squinting happy eyes.
 * Used: Lesson passed, quiz passed, daily challenge complete, achievement unlocked.
 */
export function MascotCelebrating({ size = 160 }: MascotProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const w = size;
  const h = size * 1.5;

  return (
    <View style={{ width: w, height: h, alignItems: 'center' }}>
      <Svg width={w} height={h} viewBox="0 0 220 330" fill="none">
        {/* ═══ GRADUATION CAP ═══ */}
        <G>
          {/* Flat top */}
          <Path d="M55 38 L110 12 L165 38 L110 58 Z" fill="#22223B" />
          {/* Board top */}
          <Rect x="90" y="16" width="40" height="7" rx="3.5" fill="#22223B" />
          {/* Tassel string */}
          <Line x1="150" y1="38" x2="165" y2="62" stroke="#22223B" strokeWidth="2.5" />
          {/* Tassel ball */}
          <Circle cx="167" cy="65" r="6" fill="#F7E6B6" />
          {/* Tassel detail */}
          <Path d="M163 68 L167 80 L171 68" fill="#F7E6B6" opacity={0.7} />
        </G>

        {/* ═══ PUZZLE BODY — slightly tilted for jump ═══ */}
        <G transform="translate(10, 50)">
          <PuzzleBody fill={c.primary} />
          {/* Happy squinting eyes (^_^) */}
          <Path
            d="M58 88 Q75 76 92 88"
            stroke="#22223B"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M113 88 Q130 76 147 88"
            stroke="#22223B"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Big smile */}
          <Path d="M72 128 Q100 170 133 128" fill="#22223B" />
          <Rect x="93" y="128" width="8" height="11" rx="2" fill="white" />
          <Rect x="105" y="128" width="8" height="11" rx="2" fill="white" />
          {/* Pink cheeks — extra rosy when celebrating */}
          <Ellipse cx="45" cy="112" rx="20" ry="15" fill="#F7B6B6" opacity={0.85} />
          <Ellipse cx="160" cy="112" rx="20" ry="15" fill="#F7B6B6" opacity={0.85} />
          {/* Arms raised up! */}
          <Path
            d="M15 90 Q-20 45 15 10"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M185 90 Q220 45 190 10"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small sparkles near hands */}
          <SvgText x="-5" y="8" fontSize="12" fill="#F7E6B6">
            ✨
          </SvgText>
          <SvgText x="190" y="8" fontSize="12" fill="#F7E6B6">
            ✨
          </SvgText>
        </G>

        {/* Jump shadow */}
        <Ellipse cx="110" cy="310" rx="50" ry="8" fill="#22223B" opacity={0.08} />
      </Svg>
    </View>
  );
}

/**
 * SAD MASCOT — failed quiz / retry screens.
 */
export function MascotSad({ size = 130 }: MascotProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const w = size;
  const h = size * 1.35;

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 200 270" fill="none">
        <PuzzleBody fill={c.primary} opacity={0.7} />
        {/* Sad eyes */}
        <Ellipse cx="75" cy="95" rx="16" ry="18" fill="#22223B" />
        <Ellipse cx="130" cy="95" rx="16" ry="18" fill="#22223B" />
        <Circle cx="80" cy="90" r="4.5" fill="white" />
        <Circle cx="135" cy="90" r="4.5" fill="white" />
        {/* Sad eyebrows */}
        <Path
          d="M58 72 Q75 78 92 72"
          stroke="#22223B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M113 72 Q130 78 147 72"
          stroke="#22223B"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Frown */}
        <Path
          d="M85 145 Q100 130 120 145"
          stroke="#22223B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Cheeks */}
        <Ellipse cx="52" cy="118" rx="14" ry="10" fill="#F7B6B6" opacity={0.5} />
        <Ellipse cx="153" cy="118" rx="14" ry="10" fill="#F7B6B6" opacity={0.5} />
        {/* Droopy arms */}
        <Path
          d="M18 140 Q12 190 25 230 Q28 238 30 230 Q36 195 30 150 Z"
          fill="white"
          opacity={0.7}
        />
        <Path
          d="M182 140 Q188 190 175 230 Q172 238 170 230 Q164 195 170 150 Z"
          fill="white"
          opacity={0.7}
        />
        {/* Tear drop */}
        <Path d="M90 108 Q92 120 90 128 Q88 120 90 108" fill="#64B5F6" opacity={0.6} />
      </Svg>
    </View>
  );
}

/**
 * THINKING MASCOT — one eye squinting, hand on chin, thought bubbles.
 * Used: Quiz questions, lessons, budget builder.
 */
export function MascotThinking({ size = 100 }: MascotProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const w = size;
  const h = size * 1.35;

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 200 270" fill="none">
        <PuzzleBody fill={c.primary} />
        {/* One open eye, one squinting */}
        <Ellipse cx="75" cy="92" rx="18" ry="20" fill="#22223B" />
        <Circle cx="82" cy="86" r="5" fill="white" />
        <Path
          d="M115 90 Q130 82 145 90"
          stroke="#22223B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Hmm mouth */}
        <Path d="M88 140 L118 140" stroke="#22223B" strokeWidth="5" strokeLinecap="round" />
        {/* Cheeks */}
        <Ellipse cx="50" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
        <Ellipse cx="155" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
        {/* One arm up to chin */}
        <Path
          d="M182 100 Q200 80 185 55 Q180 48 175 55 Q170 70 178 95 Z"
          fill="white"
          opacity={0.85}
        />
        <Path
          d="M18 140 Q8 175 18 210 Q22 220 26 210 Q32 180 28 145 Z"
          fill="white"
          opacity={0.85}
        />
        {/* Thought bubbles */}
        <Circle cx="175" cy="35" r="4" fill="#E8E4F0" />
        <Circle cx="185" cy="22" r="6" fill="#E8E4F0" />
        <Circle cx="195" cy="8" r="3" fill="#E8E4F0" />
      </Svg>
    </View>
  );
}

/**
 * WAVING MASCOT — friendly greeting with one arm waving.
 * Used: Welcome screen, personalization, onboarding.
 */
export function MascotWaving({ size = 130 }: MascotProps) {
  const { theme } = useTheme();
  const c = colors[theme];
  const w = size;
  const h = size * 1.4;

  return (
    <View style={{ width: w, height: h }}>
      <Svg width={w} height={h} viewBox="0 0 200 280" fill="none">
        <PuzzleBody fill={c.primary} />
        {/* Happy eyes */}
        <Ellipse cx="75" cy="92" rx="18" ry="20" fill="#22223B" />
        <Ellipse cx="130" cy="92" rx="18" ry="20" fill="#22223B" />
        <Circle cx="82" cy="86" r="5.5" fill="white" />
        <Circle cx="137" cy="86" r="5.5" fill="white" />
        {/* Happy mouth */}
        <Path d="M80 128 Q100 155 125 128" fill="#22223B" />
        <Rect x="95" y="128" width="8" height="10" rx="2" fill="white" />
        <Rect x="106" y="128" width="8" height="10" rx="2" fill="white" />
        {/* Cheeks */}
        <Ellipse cx="50" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
        <Ellipse cx="155" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
        {/* Left arm down, Right arm WAVING up */}
        <Path
          d="M18 140 Q8 175 18 210 Q22 220 26 210 Q32 180 28 145 Z"
          fill="white"
          opacity={0.85}
        />
        <Path
          d="M185 90 Q210 50 195 15 Q190 8 185 15 Q175 45 180 85 Z"
          fill="white"
          opacity={0.85}
        />
        {/* Speech wave marks near waving hand */}
        <Path
          d="M198 25 Q205 20 198 15"
          stroke="#F7E6B6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M205 30 Q212 25 205 20"
          stroke="#F9D6D0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

/* ──────────────────────────────────────────────────
   CONFETTI RAIN — particles + "hurray" text falling
   ────────────────────────────────────────────────── */
export function ConfettiRain({ width = 300, height = 280 }: { width?: number; height?: number }) {
  const CONFETTI_COLORS = [
    '#B9A7F8',
    '#F7B6B6',
    '#F9D6D0',
    '#F7E6B6',
    '#D4C8FF',
    '#4CAF50',
    '#64B5F6',
    '#FF8A80',
  ];

  // Mix of confetti shapes + "hurray" text
  const pieces = Array.from({ length: 32 }, (_, i) => ({
    x: (i / 32) * width + (Math.random() * 40 - 20),
    delay: Math.random() * 1500,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 5 + Math.random() * 10,
    rotation: Math.random() * 360,
    type: i % 5, // 0=circle, 1=rect, 2=star, 3=diamond, 4=ribbon
    speed: 1800 + Math.random() * 2000,
    swayAmount: 15 + Math.random() * 30,
  }));

  const hurrayTexts = ['🎉', '⭐', '🎊', '✨', '🏆', '💫'];
  const textPieces = Array.from({ length: 6 }, (_, i) => ({
    x: (i / 6) * width + Math.random() * 50,
    delay: 400 + Math.random() * 1200,
    emoji: hurrayTexts[i],
    speed: 2500 + Math.random() * 1500,
  }));

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Confetti shapes */}
      {pieces.map((p, i) => (
        <MotiView
          key={`c-${i}`}
          from={{ translateY: -20, translateX: 0, opacity: 1, rotate: `${p.rotation}deg` }}
          animate={{
            translateY: height + 40,
            translateX: p.swayAmount,
            opacity: 0.2,
            rotate: `${p.rotation + 360}deg`,
          }}
          transition={{
            type: 'timing',
            duration: p.speed,
            delay: p.delay,
            loop: true,
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: -10,
          }}
        >
          <View
            style={
              p.type === 0
                ? {
                    width: p.size,
                    height: p.size,
                    borderRadius: p.size / 2,
                    backgroundColor: p.color,
                  }
                : p.type === 1
                  ? {
                      width: p.size,
                      height: p.size * 0.5,
                      borderRadius: 2,
                      backgroundColor: p.color,
                    }
                  : p.type === 3
                    ? {
                        width: p.size,
                        height: p.size,
                        borderRadius: 2,
                        backgroundColor: p.color,
                        transform: [{ rotate: '45deg' }],
                      }
                    : p.type === 4
                      ? {
                          width: p.size * 0.4,
                          height: p.size * 1.5,
                          borderRadius: p.size * 0.2,
                          backgroundColor: p.color,
                        }
                      : {
                          width: 0,
                          height: 0,
                          backgroundColor: 'transparent',
                          borderLeftWidth: p.size / 2,
                          borderRightWidth: p.size / 2,
                          borderBottomWidth: p.size,
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderBottomColor: p.color,
                        }
            }
          />
        </MotiView>
      ))}

      {/* Emoji "hurray" pieces falling from top */}
      {textPieces.map((p, i) => (
        <MotiView
          key={`t-${i}`}
          from={{ translateY: -40, opacity: 1, scale: 0.5 }}
          animate={{ translateY: height + 50, opacity: 0.3, scale: 1 }}
          transition={{
            type: 'timing',
            duration: p.speed,
            delay: p.delay,
            loop: true,
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: -20,
          }}
        >
          <Text style={{ fontSize: 20 }}>{p.emoji}</Text>
        </MotiView>
      ))}
    </View>
  );
}

/**
 * HURRAY BANNER — "Hurray!" text falling from top with bounce.
 * Pair with MascotCelebrating for full celebration effect.
 */
export function HurrayBanner() {
  return (
    <MotiView
      from={{ translateY: -100, opacity: 0, scale: 0.3, rotate: '-10deg' }}
      animate={{ translateY: 0, opacity: 1, scale: 1, rotate: '0deg' }}
      transition={{
        type: 'spring',
        damping: 8,
        stiffness: 100,
        mass: 1,
        delay: 400,
      }}
      style={{ alignItems: 'center', zIndex: 20 }}
    >
      <Text
        style={{
          fontFamily: 'Fredoka_700Bold',
          fontSize: 42,
          color: '#F7E6B6',
          textShadowColor: 'rgba(0,0,0,0.15)',
          textShadowOffset: { width: 0, height: 3 },
          textShadowRadius: 8,
          textAlign: 'center',
        }}
      >
        Hurray! 🎉
      </Text>
    </MotiView>
  );
}
