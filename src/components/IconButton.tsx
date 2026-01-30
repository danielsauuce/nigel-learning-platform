import { TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  positionClassName?: string;
}

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  positionClassName,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      className={`p-3 rounded-full hover:bg-secondary active:bg-secondary/80 transition-colors ${positionClassName ?? ''}`}
    >
      <View>{icon}</View>
    </TouchableOpacity>
  );
}
