import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  label: string;
  value: string;
  color: string;
  bg: string;
};

export function StatPill({ label, value, color, bg }: Props) {
  return (
    <View
      className="rounded-2xl px-5 py-3"
      style={{
        backgroundColor: bg,
        minWidth: 130,
      }}
    >
      <Text
        className="mb-0.5 font-poppins-semibold text-[10px] uppercase tracking-wider"
        style={{ color }}
      >
        {label}
      </Text>

      <Text className="font-fredoka text-2xl" style={{ color }}>
        {value}
      </Text>
    </View>
  );
}
