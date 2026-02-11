import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 h-[42px] w-[42px] items-center justify-center rounded-[14px]"
      style={{
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      activeOpacity={0.7}
    >
      <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2} />
    </TouchableOpacity>
  );
}
