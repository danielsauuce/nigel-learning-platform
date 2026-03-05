import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MotiView } from 'moti';
import { LayoutGrid, RotateCcw } from 'lucide-react-native';

interface SimulatorHeaderProps {
  onReset: () => void;
}

export function SimulatorHeader({ onReset }: SimulatorHeaderProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 16, stiffness: 130 }}
    >
      <View className="mb-5 flex-row items-center justify-between px-6">
        <View className="flex-row items-center gap-2.5">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-foreground">
            <LayoutGrid size={20} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text className="font-fredoka text-2xl text-foreground">Simu</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onReset}
          className="flex-row items-center gap-1.5"
        >
          <RotateCcw size={15} color="rgb(107, 114, 128)" strokeWidth={2} />
          <Text className="font-poppins-semibold text-sm text-muted-foreground">Reset</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
