import Animated, { FadeIn } from 'react-native-reanimated';

interface SplashVersionProps {
  label: string;
}

export function SplashVersion({ label }: SplashVersionProps) {
  return (
    <Animated.Text
      entering={FadeIn.duration(800).delay(1200)}
     className="absolute bottom-4 right-4 text-xs text-gray-400"
    >
      {label}
    </Animated.Text>
  );
}
