import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { ChevronLeft, Briefcase } from 'lucide-react-native';

interface PayslipHeaderProps {
  jobTitle: string;
  onBack: () => void;
}

export function PayslipHeader({ jobTitle, onBack }: PayslipHeaderProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130 }}
    >
      {/* Back + title */}
      <View className="mb-2 flex-row items-center justify-center px-5">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          className="absolute left-5 p-1"
        >
          <ChevronLeft size={24} className="text-foreground" strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="font-poppins-semibold text-base tracking-wide text-foreground">
          Your Payslip
        </Text>
      </View>

      {/* Job badge */}
      <View className="mb-4 mt-2 items-center">
        <View className="flex-row items-center gap-2 rounded-xl bg-primary/10 px-4 py-1.5">
          <Briefcase size={14} className="text-primary" strokeWidth={2} />
          <Text className="font-poppins-semibold text-xs text-primary">{jobTitle}</Text>
        </View>
      </View>
    </MotiView>
  );
}
