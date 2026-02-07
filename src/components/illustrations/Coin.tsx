import React from 'react';
import { Circle, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface CoinProps {
  cx: number;
  cy: number;
  r: number;
  gradientId: string;
  symbol?: string;
}

/**
 * Reusable gold coin SVG element with gradient fill and currency symbol.
 * Must be rendered inside an `<Svg>` parent.
 */
export function Coin({ cx, cy, r, gradientId, symbol = '£' }: CoinProps) {
  return (
    <>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD700" />
          <Stop offset="1" stopColor="#F5A623" />
        </LinearGradient>
      </Defs>

      <Circle cx={cx} cy={cy} r={r} fill={`url(#${gradientId})`} />
      <Circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke="#E8960C" strokeWidth={r * 0.12} />
      <SvgText
        x={cx}
        y={cy + r * 0.35}
        textAnchor="middle"
        fontSize={r}
        fontWeight="bold"
        fill="#B8760A"
      >
        {symbol}
      </SvgText>
    </>
  );
}
