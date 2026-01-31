import { TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  positionClassName?: string;
  disabled?: any;
  accessibilityHint?: any;
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
      activeOpacity={0.4}
      className={`p-3 rounded-full ${positionClassName ?? ''}`}
    >
      <View>{icon}</View>
    </TouchableOpacity>
  );
}
